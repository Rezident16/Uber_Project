from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from ..models.item import Item
import csv

# Adds a demo user, you can add other users here if you want
def seed_items():
    with open("app/seeds/items_seed.csv", "r") as file:
        csvreader = csv.reader(file)
        for item_row in csvreader:
            item = Item(
                restaurant_id = int(item_row[0]),
                name = item_row[1],
                description = item_row[2],
                category = item_row[3],
                preview_img = item_row[4],
                price = float(item_row[5]),
                is_alcohol = True if item_row[6] == "TRUE" else False
            )
            db.session.add(item)
            db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))
        # db.session.execute(text("DELETE FROM items; DELETE FROM sqlite_sequence WHERE name='items';"))


    db.session.commit()