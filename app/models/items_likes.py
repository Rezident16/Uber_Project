from . import db, add_prefix_for_prod

items_likes = db.Table(
    "items_likes",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("user.id")), primary_key=True),
    db.Column("item_id", db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), primary_key=True),
)
