# from ..models.db import db, environment, SCHEMA
from app.models.db import db, environment, SCHEMA
from app.models.user import User
# from ..models.user import User
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_users():

    mason = User(
        username='masonaustin123',
        first_name='Mason',
        last_name='Austin',
        email='mason@aa.io',
        hashed_password='passwordMason',
        birthday=date(2000, 9, 7)
    )

    zohaib = User(
        username='zohaibrajan456',
        first_name='Zohaib',
        last_name='Rajan',
        email='zohaib@aa.io',
        hashed_password='passwordZohaib',
        birthday=date(2002, 5, 22)
    )

    andrei = User(
        username='andreivorobev789',
        first_name='Andrei',
        last_name='Vorobev',
        email='andrei@aa.io',
        hashed_password='passwordAndrei',
        birthday=date(1995, 8, 16)
    )

    brian = User(
        username='brianstokes111',
        first_name='Brian',
        last_name='Stokes',
        email='brian@aa.io',
        hashed_password='passwordBrian',
        birthday=date(1997, 1, 31)
    )

    ronald = User(
        username='mickiedeez',
        first_name='Ronald',
        ast_name='McDonald',
        email='ronald@mcdonalds.com',
        hashed_password='BigMac123',
        birthday=date(1963, 12, 18)
    )

    wendy = User(
        username='fourforfour',
        first_name='Wendy',
        last_name='Thomas-Morse',
        email='wendy@wendys.com',
        hashed_password='Frosty321',
        birthday=date(1961, 9, 14)
    )

    demo = User(
        username='demouser',
        first_name='Demo',
        last_name='User',
        email='demo@aa.io',
        hashed_password='password',
        birthday=date(2000, 1, 1)
    )

    shaggy = User(
        username='shaggy',
        first_name='Shaggy',
        last_name='Rogers',
        email='shaggy@warnerbros.com',
        hashed_password='scoobysnack123',
        birthday=date(2000, 1, 1)
    )

    scooby = User(
        username='scoobydoobydooooo',
        first_name='Scooby',
        last_name='Doo',
        email='scoob@warnerbros.com',
        hashed_password='rutroh123',
        birthday=date(2000, 1, 1)
    )

    fred = User(
        username='fred',
        first_name='Fred',
        last_name='Jones',
        email='fred@warnerbros.com',
        hashed_password='fred123',
        birthday=date(2000, 1, 1)
    )

    db.session.add(mason)
    db.session.add(zohaib)
    db.session.add(andrei)
    db.session.add(brian)
    db.session.add(ronald)
    db.session.add(wendy)
    db.session.add(demo)
    db.session.add(shaggy)
    db.session.add(scooby)
    db.session.add(fred)
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
