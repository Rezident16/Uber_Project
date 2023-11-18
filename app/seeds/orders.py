from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_orders():
    demo = Order(
        user_id = 1,
        created_at = datetime.today(),
        is_complete = False,
        address = '6431 Chicago Ave, Seattle, WA 12345',
        price = 68.2,
        restaurant_id = 2
        )
    demo2 = Order(
        user_id = 1,
        created_at = datetime.today(),
        is_complete = False,
        address = '6431 Chicago Ave, Seattle, WA 12345',
        price = 17.39,
        restaurant_id = 3
        )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))
        # db.session.execute(text("DELETE FROM orders; DELETE FROM sqlite_sequence WHERE name='orders';"))

    db.session.commit()
