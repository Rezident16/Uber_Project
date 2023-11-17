from . import db

orders_items = db.Table(
    "orders_items",
    db.Model.metadata,
    db.Column("order_id", db.Integer, db.ForeignKey("orders.id")),
    db.Column("item_id", db.Integer, db.ForeignKey("items.id")),
)