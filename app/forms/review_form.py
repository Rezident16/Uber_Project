from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange

class ReviewForm(FlaskForm):
    review = StringField("name", validators=[DataRequired()])
    stars = IntegerField("stars", validators=[DataRequired(), NumberRange(1,5)])
