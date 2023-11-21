from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from datetime import date


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def birthday_is_valid(form, field):
    # Checking if b-day is not in the future
    birthday = field.data
    if birthday > date.today():
        raise ValidationError("Birthday cannot be in the future.")
    

class UpdateUserForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    first_name = StringField("First Name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    birthday = DateField("Birthday", validators=[birthday_is_valid])
    address = StringField("Address")
