from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from ..models.orders_items import orders_items
# Adds seed data for orders_items
def seed_orders_items():
    orders_items_data = [
        {"order_id": 1, "item_id": 3},
        {"order_id": 1, "item_id": 4},
        {"order_id": 2, "item_id": 1},
        {"order_id": 2, "item_id": 2},
    ]

    # Create an insert statement with values
    insert_statement = db.insert(orders_items).values(orders_items_data)

    # Execute the insert statement
    db.session.execute(insert_statement)
    db.session.commit()
# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
def undo_orders_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders_items"))

    db.session.commit()
