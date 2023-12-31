from . import add_prefix_for_prod
from .db import environment, SCHEMA, db

orders_items = db.Table(
    "orders_items",
    db.Model.metadata,
    db.Column("order_id", db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id"), ondelete='CASCADE')),
    db.Column("item_id", db.Integer, db.ForeignKey(add_prefix_for_prod("items.id"), ondelete='CASCADE')),
)

if environment == "production":
    orders_items.schema = SCHEMA
