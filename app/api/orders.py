# from flask import Blueprint, jsonify, session, request, render_template, redirect, abort
# from app.models import User, Restaurant, Review, Item, db, Order
# from flask_login import current_user, login_required
# from datetime import time, datetime
# from app.forms import OrderForm

# order_routes = Blueprint('orders', __name__)



# @login_required
# def create_order():
#     """Create a new order"""
#     form = OrderForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
    
#     # if form.validate_on_submit():
#     #     data = form.data
        
        
#     #     new_order = Order(
#     #         user_id = current_user.id,
#     #         restaurant_id = restaurantId,
#     #         items = []
#     #     )