from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TimeField, SubmitField
from wtforms.validators import DataRequired


IMAGE_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}


class RestaurantForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    category = StringField("category", validators=[DataRequired()])
    address = StringField("address", validators=[DataRequired()])
    city = StringField("city", validators=[DataRequired()])
    state = StringField("state", validators=[DataRequired()])
    hours_open = TimeField("hours open", validators=[DataRequired()])
    hours_close = TimeField("hours close", validators=[DataRequired()])
    preview_img = FileField("preview image", validators=[FileAllowed(list(IMAGE_EXTENSIONS))])
    # submit = SubmitField("submit")
    
