from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    demo = Restaurant(
        owner_id = 1, 
        name = 'Scooby Ice Cream', 
        category = 'American', 
        address = '111 California st', 
        city = 'San Francisco', 
        state = 'CA', 
        hours_open = '09:00:00', 
        hours_close = '20:00:00', 
        preview_img = 'https://pbs.twimg.com/media/DfFRrlVWkAAYbAz.jpg:large', 
        min_order_time = 10, 
        max_order_time = 35)
    marnieRestaurant = Restaurant(
        owner_id = 2, 
        name = 'Shaggy Burgers', 
        category = 'American', 
        address = '112 California st', 
        city = 'San Francisco', 
        state = 'CA', 
        hours_open = '09:00:00', 
        hours_close = '20:00:00',  
        preview_img = 'https://static.wikia.nocookie.net/scoobydoo/images/a/a4/Hamburger.png/revision/latest?cb=20180119232637', 
        min_order_time = 15, 
        max_order_time = 24)
    bobbieRestaurant = Restaurant(
        owner_id = 3, 
        name = "Fred's Pizza", 
        category = 'Italian', 
        address = '113 California st', 
        city = 'San Francisco', 
        state = 'CA', 
        hours_open = '09:00:00', 
        hours_close = '20:00:00', 
        preview_img = 'https://static.wikia.nocookie.net/flinstones/images/a/a9/The_Flintstone_Comedy_Hour_-_Pizza-Puss.jpg/revision/latest?cb=20200305205945', 
        min_order_time = 11, 
        max_order_time = 42)
    bobbieRestaurant2 = Restaurant(
        owner_id = 4, 
        name = 'Velma BBQ Grill', 
        category = 'American', 
        address = '114 California st', 
        city = 'San Francisco', 
        state = 'CA', 
        hours_open = '09:00:00', 
        hours_close = '20:00:00', 
        preview_img ='https://64.media.tumblr.com/e74cd9b1e16b3a7f2971103e2a51548b/ff51ddbdee0567af-d9/s640x960/cfe8c90e5ea784c40647a436837fb51b85a73c7f.gif', 
        min_order_time = 20, 
        max_order_time = 70)

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
def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))
        
    db.session.commit()
