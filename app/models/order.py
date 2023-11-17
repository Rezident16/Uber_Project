from . import db, orders_items, add_prefix_for_prod
from .db import environment, SCHEMA

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False) #confirm after users are created
    created_at = db.Column(db.DateTime) #Check migrations file
    is_complete = db.Column(db.Boolean, default=False)
    address = db.Column(db.String, nullable=False)
    price = db.Column(db.Float)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")), nullable=False)

    user = db.relationship("User", back_populates="orders")
    restaurant = db.relationship("Restaurant", back_populates="orders")
    items = db.relationship("Order", secondary=orders_items, back_populates='orders')
