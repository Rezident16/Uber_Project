from ..models import db

class Restaurant(db.Model):
    __tablename__ = "restaurants"
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    hours_open = db.Column(db.Float, nullable=False)
    hours_close = db.Column(db.Float, nullable=False)
    preview_img = db.Column(db.String(255), nullable=False)
    min_order_time = db.Column(db.Integer)
    max_order_time = db.Column(db.Integer)
    