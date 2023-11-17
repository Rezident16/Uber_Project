from app.models import db, orders_items, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_orders_items():
    order_items_1 = orders_items(
        order_id = 1,
        item_id = 3
        )
    order_items_2 = orders_items(
        order_id = 1,
        item_id = 4
        )
    order_items_3 = orders_items(
        order_id = 2,
        item_id = 1
        )
    order_items_4 = orders_items(
        order_id = 2,
        item_id = 2
        )

    db.session.add(order_items_1)
    db.session.add(order_items_2)
    db.session.add(order_items_3)
    db.session.add(order_items_4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
