from flask import Blueprint, jsonify, request, abort, request
from app.models import User, Restaurant, Review, Item, Order, db
from flask_login import current_user, login_required
from datetime import time, datetime
from random import randint
from app.forms import RestaurantForm, ReviewForm, ItemForm, OrderForm
from .aws_helpers import *

restaurant_routes = Blueprint('restaurants', __name__)

@restaurant_routes.route("", methods=["GET"])
def get_all_restaurants():
    """Get all restaurants"""
    restaurants = Restaurant.query.all()
    return {"Restaurants": [restaurant.to_dict_no_user() for restaurant in restaurants]}

@restaurant_routes.route("/<int:restaurantId>", methods=["GET"])
def get_restaurant(restaurantId):
    """Get restaurant details"""
    restaurant = Restaurant.query.get(restaurantId)
    if not restaurant:
        # return {"error": "not found"}, 404
        return abort(404, description='Restaurant not found')

    return restaurant.to_dict()

# @restaurant_routes.route("/new")
# def get_form():
#     form = RestaurantForm()
#     return render_template("restaurant_form.html", form = form, errors = None)

@restaurant_routes.route("", methods=["POST"])
@login_required
def post_restaurant():
    """Post a restaurant"""
    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        image = data['preview_img']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
            return { 'errors': upload }, 500

        # Create minimum and maximum order times for fake delivery wait times
        min_time = randint(10, 50)
        max_time = min_time + 15

        new_restaurant = Restaurant(
            name = data["name"],
            category = data["category"],
            address = data["address"],
            city = data["city"],
            state = data["state"],
            hours_open = time.fromisoformat(str(data["hours_open"])),
            hours_close = time.fromisoformat(str(data["hours_close"])),
            preview_img = upload["url"],
            # preview_img = 'https://savoryscoot.s3.amazonaws.com/seeder-images/scooby-ice-cream.png',
            owner_id = current_user.id,
            # assign random values for fake delivery ETA's
            min_order_time = min_time,
            max_order_time = max_time
        )

        db.session.add(new_restaurant)
        db.session.commit()
        return new_restaurant.to_dict(), 200

    if form.errors:
        return form.errors


@restaurant_routes.route("/<int:restaurantId>", methods=["POST"])
@login_required
def update_restaurant(restaurantId):
    """Update a restaurant by id"""
    restaurant = Restaurant.query.get(restaurantId)

    if not restaurant:
        return abort(404, description='Restaurant not found')

    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        if restaurant.owner_id != current_user.id:
            # return {"error": "Unauthorized"}
            return abort(403, description='Unauthorized')

        if data["preview_img"]:
            image = data['preview_img']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)

            if "url" not in upload:
                # return render_template("restaurant_form.html", form=form, errors=upload)
                return { 'errors': upload }, 500
            else :
                remove_file_from_s3(restaurant.preview_img)
                restaurant.preview_img = upload["url"]

        restaurant.name = data["name"]
        restaurant.category = data["category"]
        restaurant.address = data["address"]
        restaurant.city = data["city"]
        restaurant.state = data["state"]
        restaurant.hours_open = data["hours_open"]
        restaurant.hours_close = data["hours_close"]

        db.session.commit()

        return restaurant.to_dict(), 200

    if form.errors:
        return form.errors

    return {"error": "uh oh"}


@restaurant_routes.route("/<int:restaurantId>", methods=["DELETE"])
def delete_restaurant(restaurantId):
    restaurant = Restaurant.query.get(restaurantId)

    if not restaurant:
        return abort(404, description='Restaurant not found')

    if restaurant.owner_id != current_user.id:
            # return {"error": "Unauthorized"} , 403
        return abort(403, description='Unauthorized')

    db.session.delete(restaurant)
    db.session.commit()

    return {"status": "success"}, 200


@restaurant_routes.route("/<int:restaurantId>/items/new", methods=["POST"])
@login_required
def post_item(restaurantId):
    """Create an item"""
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        image = data['preview_img']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
            return { 'errors': upload }, 500

        # Create minimum and maximum order times for fake delivery wait times

        new_item = Item(
            name = data["name"],
            description = data["description"],
            category = data["category"],
            preview_img = upload["url"],
            price = data["price"],
            is_alcohol=data["is_alcohol"],
            restaurant_id = restaurantId,
        )

        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict(), 200

    if form.errors:
        return form.errors



    # REVIEWS ENDPOINTS


@restaurant_routes.route("/<int:restaurantId>/reviews", methods=["POST"])
@login_required
def create_review(restaurantId):
    """Post a review"""
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    restaurant = Restaurant.query.get(restaurantId)

    existing_review = Review.query.filter_by(user_id=current_user.id, restaurant_id=restaurantId).first()

    if existing_review is not None:
        return abort(400, description="User already has review for this restaurant")

    if not restaurant:
        return abort(404, description='Restaurant not found')

    if restaurant.owner_id == current_user.id:
        return abort(403, description='Cannot leave reviews on restaurant that you own')

    if form.validate_on_submit():
        data= form.data

        new_review = Review(
            user_id = current_user.id,
            restaurant_id = restaurantId,
            review = data["review"],
            stars = data["stars"],
            created_at = datetime.now()
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 200

    if form.errors:
        return form.errors
    
    
# ORDERS ROUTE

@restaurant_routes.route("/<int:restaurantId>/orders", methods=["POST"])
@login_required
def create_order(restaurantId):
    """Create a new order"""
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        data = form.data
        
        new_order = Order(
            user_id = current_user.id,
            restaurant_id = restaurantId,
            address = data["address"],
            created_at = datetime.now(),
            notes = data["notes"],
            price = 0
        )
        req = request.get_json() 
        
        items = [Item.query.get(id) for id in req["item_ids"]]
        
        new_order.items = items
        
        new_price = 0
        for item in items:
            new_price += item.price
            
        new_order.price = new_price
        
        db.session.add(new_order)
        db.session.commit()
        
        return new_order.to_dict()
        
        