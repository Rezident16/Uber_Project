from . import db, add_prefix_for_prod
from .db import environment, SCHEMA

class Restaurant(db.Model):
    __tablename__ = "restaurants"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    hours_open = db.Column(db.Time, nullable=False)
    hours_close = db.Column(db.Time, nullable=False)
    preview_img = db.Column(db.String, nullable=False)
    min_order_time = db.Column(db.Integer)
    max_order_time = db.Column(db.Integer)
    
    owner = db.relationship("User", back_populates="restaurants")
    reviews = db.relationship("Review", back_populates="restaurant", passive_deletes=True)
    items = db.relationship("Item", back_populates="restaurant", passive_deletes=True)
    orders = db.relationship("Order", back_populates="restaurant", passive_deletes=True)

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'category': self.category,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'hours_open': self.hours_open.strftime("%H:%M"),
            'hours_close': self.hours_close.strftime("%H:%M"),
            'preview_img': self.preview_img,
            'min_order_time': self.min_order_time,
            'max_order_time': self.max_order_time,
            'owner': self.owner.to_dict(),
            'reviews': [review.to_dict() for review in self.reviews],
            'items': [item.to_dict_with_restaurant() for item in self.items],
            'orders': [order.to_dict() for order in self.orders]
        }
    
    def to_dict_no_user(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'category': self.category,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'hours_open': self.hours_open.strftime("%H:%M"),
            'hours_close': self.hours_close.strftime("%H:%M"),
            'preview_img': self.preview_img,
            'min_order_time': self.min_order_time,
            'max_order_time': self.max_order_time,
            'reviews': [review.to_dict_no_user() for review in self.reviews]
            # 'items': [item.to_dict() for item in self.items],
        }
    