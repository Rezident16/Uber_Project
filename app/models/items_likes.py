from . import db, add_prefix_for_prod
from .db import environment, SCHEMA

items_likes = db.Table(
    "items_likes",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='CASCADE'), primary_key=True),
    db.Column("item_id", db.Integer, db.ForeignKey(add_prefix_for_prod("items.id"), ondelete='CASCADE'), primary_key=True),
)

if environment == "production":
    items_likes.schema = SCHEMA
