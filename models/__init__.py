from flask_sqlalchemy import SQLAlchemy
from .item import Item
from .order import Order
from .restaurant import Restaurant
from .review import Review
from .items_likes import items_likes
from .orders_items import orders_items

db = SQLAlchemy()
