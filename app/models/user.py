from .db import db, environment, SCHEMA
from .items_likes import items_likes
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    address = db.Column(db.String)

    reviews = db.relationship('Review', back_populates='user', passive_deletes=True)
    restaurants = db.relationship('Restaurant', back_populates='owner', passive_deletes=True)
    orders = db.relationship('Order', back_populates='user', passive_deletes=True)
    items = db.relationship('Item', back_populates='users', secondary=items_likes, passive_deletes=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'birthday': self.birthday,
            'address': self.address,
            'orders': [order.to_dict_no_user_with_items() for order in self.orders]
        }
    
    def to_dict_full(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'birthday': self.birthday,
            'address': self.address,
            'reviews': [review.to_dict_no_user() for review in self.reviews],
            'restaurants': [restaurant.to_dict() for restaurant in self.restaurants],
            'orders': [order.to_dict() for order in self.orders]
        }
