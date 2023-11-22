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
        preview_img = 'https://savoryscoot.s3.amazonaws.com/seeder-images/scooby-ice-cream.jpg',
        min_order_time = 10,
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
    mcdonalds = Restaurant(
        owner_id = 5,
        name = "McDonald's",
        category = 'American',
        address = '11 Main St',
        city = 'San Francisco',
        state = 'CA',
        hours_open=datetime.strptime('06:00:00', '%H:%M:%S').time(),
        hours_close=datetime.strptime('22:00:00', '%H:%M:%S').time(),
        preview_img ='https://savoryscoot.s3.amazonaws.com/seeder-images/mcdonalds.png',
        min_order_time = 10,
        max_order_time = 25)
    wendys = Restaurant(
        owner_id = 6,
        name = "Wendy's",
        category = 'American',
        address = '21 Second St',
        city = 'San Francisco',
        state = 'CA',
        hours_open=datetime.strptime('06:00:00', '%H:%M:%S').time(),
        hours_close=datetime.strptime('22:00:00', '%H:%M:%S').time(),
        preview_img ='https://savoryscoot.s3.amazonaws.com/seeder-images/wendys.png',
        min_order_time = 10,
        max_order_time = 25)
    chipotle = Restaurant(
        owner_id = 7,
        name = "Chipotle",
        category = 'American',
        address = '46599 Ankunding Dale',
        city = 'San Francisco',
        state = 'CA',
        hours_open=datetime.strptime('10:00:00', '%H:%M:%S').time(),
        hours_close=datetime.strptime('23:00:00', '%H:%M:%S').time(),
        preview_img ='https://savoryscoot.s3.amazonaws.com/seeder-images/chipotle.png',
        min_order_time = 10,
        max_order_time = 25)
    five_guys = Restaurant(
        owner_id = 8,
        name = "Five Guys",
        category = 'American',
        address = '4672 Hazel Grove',
        city = 'San Francisco',
        state = 'CA',
        hours_open=datetime.strptime('12:00:00', '%H:%M:%S').time(),
        hours_close=datetime.strptime('20:00:00', '%H:%M:%S').time(),
        preview_img ='https://savoryscoot.s3.amazonaws.com/seeder-images/five-guys.png',
        min_order_time = 10,
        max_order_time = 25)
    taco_bell = Restaurant(
        owner_id = 1,
        name = "Taco Bell",
        category = 'Mexican',
        address = '2960 Bernhard Station',
        city = 'San Francisco',
        state = 'CA',
        hours_open=datetime.strptime('05:00:00', '%H:%M:%S').time(),
        hours_close=datetime.strptime('23:00:00', '%H:%M:%S').time(),
        preview_img ='https://savoryscoot.s3.amazonaws.com/seeder-images/tacobell.jpeg',
        min_order_time = 10,
        max_order_time = 25)




    db.session.add(scooby_restaurant)
    db.session.add(shaggy_restaurant)
    db.session.add(fred_restaurant)
    db.session.add(velma_restaurant)
    db.session.add(mcdonalds)
    db.session.add(wendys)
    db.session.add(chipotle)
    db.session.add(five_guys)
    db.session.add(taco_bell)


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
