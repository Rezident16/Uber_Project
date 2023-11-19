from flask import Blueprint, jsonify, abort
from flask_login import login_required, current_user
from app.models import User
from app.forms import UpdateUserForm
from app.models import db

user_routes = Blueprint('users', __name__)


# @user_routes.route('/')
# @login_required
# def users():
#     """
#     Query for all users and returns them in a list of user dictionaries
#     """
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}


@user_routes.route('/current')
def user():
    """
    Query for a user by id and returns that user in a dictionary
    """
    try:
        user = User.query.get(current_user.id)
    except AttributeError:
        return {"user": None}
    return user.to_dict()

@user_routes.route('/<int:id>', methods=["POST"])
@login_required
def update_user(id):
    """
    Update a user by their id
    """
    user = User.query.get(id)
    form = UpdateUserForm()
    
    if current_user.id != user.id:
        return abort(403, description="Unauthorized")
    
    if form.validate_on_submit():
        data = form.data
        user["username"] = data["username"]
        user["email"] = data["email"]
        user["first_name"] = data["first_name"]
        user["last_name"] = data["last_name"]
        user["birthday"] = data["birthday"]
        user["address"] = data["address"]
        db.session.commit()
        
    if form.errors:
        return form.errors
    
    
    
    
