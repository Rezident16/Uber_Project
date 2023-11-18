from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from ..models.items_likes import items_likes
# Adds seed data for items_likes
def seed_items_likes():
    items_likes_data = [
        {"user_id": 1, "item_id": 3},
        {"user_id": 1, "item_id": 4},
        {"user_id": 2, "item_id": 1},
        {"user_id": 2, "item_id": 2},
    ]

    # Create an insert statement with values
    insert_statement = db.insert(items_likes).values(items_likes_data)

    # Execute the insert statement
    db.session.execute(insert_statement)
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
