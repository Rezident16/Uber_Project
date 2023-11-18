from . import db, add_prefix_for_prod
from .db import environment, SCHEMA
from .items_likes import items_likes
from .orders_items import orders_items

class Item(db.Model):
    __tablename__ = "items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id"), ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    preview_img = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    is_alcohol = db.Column(db.Boolean, nullable=False)

    restaurant = db.relationship("Restaurant", back_populates="items")
    orders = db.relationship("Order", secondary=orders_items, back_populates='items', passive_deletes=True)
    users = db.relationship("User", secondary=items_likes, back_populates='items', passive_deletes=True )

    def to_dict(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'name': self.name,
            'description': self.description,
            'category': self.category,
            'preview_img': self.preview_img,
            'price': self.price,
            'is_alcohol': self.is_alcohol
        }
    
    def to_dict_no_user(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'name': self.name,
            'description': self.description,
            'category': self.category,
            'preview_img': self.preview_img,
            'price': self.price,
            'is_alcohol': self.is_alcohol,
            'restaurant': self.restaurant.to_dict_no_user(),
            'likes_ratio': len(self.users)/len(self.orders)
            # 'users': len(self.users),
            # 'orders': len(self.orders)
        }
