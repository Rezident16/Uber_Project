from . import db, add_prefix_for_prod
from .db import environment, SCHEMA

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='CASCADE'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id"), ondelete='CASCADE'), nullable=False)
    review = db.Column(db.String, nullable=False)
    stars = db.Column(db.Integer)
    created_at = db.Column(db.DateTime) #Check migrations file
    
    restaurant = db.relationship("Restaurant", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'restaurant_id': self.restaurant_id,
            'review': self.review,
            'stars': self.stars,
            'created_at': self.created_at,
            'user': self.user.to_dict(),
            'restaurant': self.restaurant.to_dict_no_user()
        }

    def to_dict_no_user(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'restaurant_id': self.restaurant_id,
            'review': self.review,
            'stars': self.stars,
            'created_at': self.created_at,
        }
