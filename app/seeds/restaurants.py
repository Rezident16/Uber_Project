from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, time


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    scooby_restaurant = Restaurant(
        owner_id = 1,
        name = 'Scooby Ice Cream',
        category = 'American',
        address = '111 California st',
        city = 'San Francisco',
        state = 'CA',
        hours_open=datetime.strptime('09:00:00', '%H:%M:%S').time(),
        hours_close=datetime.strptime('20:00:00', '%H:%M:%S').time(),
<<<<<<< HEAD
        preview_img = 'https://savoryscoot.s3.amazonaws.com/seeder-images/scooby-ice-cream.jpg',
        min_order_time = 10,
=======
        preview_img = 'https://savoryscoot.s3.amazonaws.com/seeder-images/scooby-ice-cream.jpg', 
        min_order_time = 10, 
>>>>>>> 78793f2cb1d53c4aa02f516408515f33213587aa
        max_order_time = 35)
    shaggy_restaurant = Restaurant(
        owner_id = 2,
        name = 'Shaggy Burgers',
        category = 'American',
        address = '112 California st',
        city = 'San Francisco',
        state = 'CA',
        hours_open=datetime.strptime('09:00:00', '%H:%M:%S').time(),
        hours_close=datetime.strptime('20:00:00', '%H:%M:%S').time(),
        preview_img = 'https://savoryscoot.s3.amazonaws.com/seeder-images/shaggy-hamburger.jpg',
        min_order_time = 15,
        max_order_time = 24)
    fred_restaurant = Restaurant(
        owner_id = 3,
        name = "Fred's Pizza",
        category = 'Italian',
        address = '113 California st',
        city = 'San Francisco',
        state = 'CA',
        hours_open=datetime.strptime('09:00:00', '%H:%M:%S').time(),
        hours_close=datetime.strptime('20:00:00', '%H:%M:%S').time(),
        preview_img = 'https://savoryscoot.s3.amazonaws.com/seeder-images/fred-pizza.jpg',
        min_order_time = 11,
        max_order_time = 42)
    velma_restaurant = Restaurant(
        owner_id = 4,
        name = 'Velma BBQ Grill',
        category = 'American',
        address = '114 California st',
        city = 'San Francisco',
        state = 'CA',
        hours_open=datetime.strptime('09:00:00', '%H:%M:%S').time(),
        hours_close=datetime.strptime('20:00:00', '%H:%M:%S').time(),
        preview_img ='https://savoryscoot.s3.amazonaws.com/seeder-images/daphne-velma-hot-dog.gif',
        min_order_time = 20,
        max_order_time = 70)

    db.session.add(scooby_restaurant)
    db.session.add(shaggy_restaurant)
    db.session.add(fred_restaurant)
    db.session.add(velma_restaurant)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
