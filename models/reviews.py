from ..models import db

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False) #confirm after users are created
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False)
    review = db.Column(db.String, nullable=False)
    stars = db.Column(db.Integer)
    created_at = db.Column(db.Date) #Check migrations file
