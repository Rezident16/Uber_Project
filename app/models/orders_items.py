from . import db, add_prefix_for_prod

orders_items = db.Table(
    "orders_items",
    db.Model.metadata,
    db.Column("order_id", db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id"))),
    db.Column("item_id", db.Integer, db.ForeignKey(add_prefix_for_prod("items.id"))),
)
