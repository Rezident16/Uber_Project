from flask_sqlalchemy import SQLAlchemy 

db = SQLAlchemy()

class Orders(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False) #confirm after users are created
    created_at = db.Column(db.Date) #Check migrations file
    is_complete = db.Column(db.Boolean)
    address = db.Column(db.String, nullable=False)
    price = db.Column(db.Float)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False)
