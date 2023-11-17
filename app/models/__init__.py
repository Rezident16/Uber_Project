from .db import db, add_prefix_for_prod
from .user import User
from .db import environment, SCHEMA
from flask_sqlalchemy import SQLAlchemy
from .item import Item
from .order import Order
from .restaurant import Restaurant
from .review import Review
from .items_likes import items_likes
from .orders_items import orders_items
