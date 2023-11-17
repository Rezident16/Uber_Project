from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_Restaurant():
    demo = Restaurant(
        owner_id = 1, 
        name, 
        category, 
        address, 
        city, 
        state, 
        hours_open, 
        hours_close, 
        preview_img, 
        min_order_time, 
        max_order_time)
    marnieRestaurant = Restaurant(
        owner_id = 2, 
        name, 
        category, 
        address, 
        city, 
        state, 
        hours_open, 
        hours_close, 
        preview_img, 
        min_order_time, 
        max_order_time)
    bobbieRestaurant = Restaurant(
        owner_id = 3, 
        name, 
        category, 
        address, 
        city, 
        state, 
        hours_open, 
        hours_close, 
        preview_img, 
        min_order_time, 
        max_order_time)
    bobbieRestaurant2 = Restaurant(
        owner_id = 4, 
        name, 
        category, 
        address, 
        city, 
        state, 
        hours_open, 
        hours_close, 
        preview_img, 
        min_order_time, 
        max_order_time)

    db.session.add(demo)
    db.session.add(marnieRestaurant)
    db.session.add(bobbieRestaurant)
    db.session.add(bobbieRestaurant2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
