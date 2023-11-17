from app.models import db, items_likes, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_items_likes():
    items_likes1 = items_likes(
        user_id = 1,
        item_id = 3
        )
    items_likes_2 = items_likes(
        user_id = 1,
        item_id = 4
        )
    items_likes_3 = items_likes(
        user_id = 2,
        item_id = 1
        )
    items_likes_4 = items_likes(
        user_id = 2,
        item_id = 2
        )

    db.session.add(items_likes1)
    db.session.add(items_likes_2)
    db.session.add(items_likes_3)
    db.session.add(items_likes_4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_items_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items_likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items_likes"))

    db.session.commit()
