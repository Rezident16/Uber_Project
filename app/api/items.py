from flask import Blueprint, jsonify, session, request, render_template, redirect, abort
from app.models import User, Item, db, Restaurant
from flask_login import current_user, login_required
from datetime import time
from random import randint
from app.forms import ItemForm
from .aws_helpers import *

item_routes = Blueprint('items', __name__)
 
    
@item_routes.route("/<int:itemId>", methods=["POST"])
@login_required
def update_restaurant(itemId):
    """Update an item by id"""
    item = Item.query.get(itemId)
    if not item:
        return abort(404, description='Item not found')

    restaurant = Restaurant.query.get(item.restaurant_id)
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        data = form.data
        
        if restaurant.owner_id != current_user.id:
            return abort(403, description='Unauthorized')
        
        if data["preview_img"]:
            image = data['preview_img']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)

            if "url" not in upload:
                return { 'errors': upload }, 500
            else :
                remove_file_from_s3(restaurant.preview_img)
                item.preview_img = upload["url"]
        
        item.name = data["name"],
        item.description = data["description"],
        item.category = data["category"],
        item.preview_img = upload["url"],
        item.price = data["price"],
        item.is_alcohol=data["is_alcohol"],    
        
        db.session.commit()
        
        return item.to_dict(), 200
    
    if form.errors:
        return form.errors

    # return {"error": "uh oh"}


@item_routes.route("/<int:itemId>", methods=["DELETE"])
def delete_item(itemId):
    item = Item.query.get(itemId)
    
    if not item:
        return abort(404, description='Item not found')
    
    restaurant = Restaurant.query.get(item.restaurant_id)

    if restaurant.owner_id != current_user.id:
            # return {"error": "Unauthorized"} , 403
        return abort(403, description='Unauthorized')
        
    db.session.delete(item)
    db.session.commit()
    
    return {"status": "success"}, 200
    