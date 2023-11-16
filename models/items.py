from ..models import db

class Items(db.Model):
    __tablename__ = "items"
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    preview_img = db.Column(db.String(), nullable=False) 
    price = db.Column(db.Float, nullable=False)
    is_alcohol = db.Column(db.Boolean, nullable=False)
    
    