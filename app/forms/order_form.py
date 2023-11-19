from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired

class OrderForm(FlaskForm):
    address = StringField("address", validators=[DataRequired()])
    notes = TextAreaField("notes")