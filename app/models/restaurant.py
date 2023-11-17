from . import db, add_prefix_for_prod
from .db import environment, SCHEMA

class Restaurant(db.Model):
    __tablename__ = "restaurants"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    hours_open = db.Column(db.Time, nullable=False)
    hours_close = db.Column(db.Time, nullable=False)
    preview_img = db.Column(db.String, nullable=False)
    min_order_time = db.Column(db.Integer)
    max_order_time = db.Column(db.Integer)
    
    owner = db.relationship("User", back_populates="restaurants")
    reviews = db.relationship("Review", back_populates="restaurant")
    items = db.relationship("Item", back_populates="restaurant")
    orders = db.relationship("Order", back_populates="restaurant")
    