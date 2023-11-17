from flask_sqlalchemy import SQLAlchemy
from .item import Item
from .order import Order
from .restaurant import Restaurant
from .review import Review

db = SQLAlchemy()