from . import db

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False) #confirm after users are created
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False)
    review = db.Column(db.String, nullable=False)
    stars = db.Column(db.Integer)
    created_at = db.Column(db.DateTime) #Check migrations file
    
    restaurant = db.relationship("Restaurant", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")