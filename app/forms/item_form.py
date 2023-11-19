from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, BooleanField, SubmitField, TextAreaField, FloatField
from wtforms.validators import DataRequired, Length


IMAGE_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

class ItemForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired(), Length(min=25, max=255)])
    category = StringField('category', validators=[DataRequired()])
    preview_img = FileField("preview image", validators=[FileAllowed([IMAGE_EXTENSIONS])])
    price = FloatField('price', validators=[DataRequired()])
    is_alcohol = BooleanField('alcohol', default=False)
    submit = SubmitField("submit")
