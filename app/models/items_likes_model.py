from . import db, add_prefix_for_prod
from .db import environment, SCHEMA

class Likes(db.Model):
    __tablename__ = 'likes'
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='CASCADE'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("items.id"), ondelete='CASCADE'), nullable=False)
    is_liked = db.Column(db.Boolean, default = None)
