from . import db, add_prefix_for_prod
from .db import environment, SCHEMA

# Easier to fetch the order details if needed

class ItemOrderDetails(db.Model):
    __tablename__ = "order_details"
    order_id = db.Column("order_id", db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id"), ondelete='CASCADE')),
    item_id = db.Column("item_id", db.Integer, db.ForeignKey(add_prefix_for_prod("items.id"), ondelete='CASCADE')),
    itemQty = db.Column(db.Integer, default=1)
