from . import db, orders_items, items_likes, add_prefix_for_prod
from .db import environment, SCHEMA

class Item(db.Model):
    __tablename__ = "items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    preview_img = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    is_alcohol = db.Column(db.Boolean, nullable=False)

    restaurant = db.relationship("Restaurant", back_populates="items")
    orders = db.relationship("Order", secondary=orders_items, back_populates='items')
    users = db.relationship("User", secondary=items_likes, back_populates='items')
