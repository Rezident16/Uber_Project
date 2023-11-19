from flask import Blueprint, jsonify, session, request, render_template, redirect, abort
from app.models import User, Restaurant, Review, db
from flask_login import current_user, login_required


reviews_routes = Blueprint('reviews', __name__)

@reviews_routes.route('/<int:reviewId>', methods=["DELETE"])
@login_required
def delete_review(reviewId):
    """Delete a review"""
    review = Review.query.get(reviewId)
    
    if not review:
        return abort(404, description='Review not found')
    
    if current_user.id != review.user_id:
        return abort(403, description='Unauthorized')
    
    db.session.delete(review)
    db.session.commit()
    
    return {"status": "success"}, 200
    
