from flask.cli import AppGroup
from .users import seed_users, undo_users
from .items import seed_items, undo_items
from .orders import seed_orders, undo_orders
from .reviews import seed_reviews, undo_reviews
from .restaurants import seed_restaurants, undo_restaurants
# from .orders_items import seed_orders_items, undo_orders_items
# from .items_likes import seed_items_likes, undo_items_likes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # undo_orders_items()
        undo_orders()
        undo_reviews()
        # undo_items_likes()
        undo_items()
        undo_restaurants()
        undo_users()
    # print("********* BEFORE USERS")
    users = seed_users()
    print("********* AFTER USERS")
    print (users)
    print("********* BEFORE ITEMS")
    seed_restaurants()
    items = seed_items(users)
    # print("********* AFTER ITEMS")
    seed_reviews()
    # print("********* BEFORE ORDER-ITEMS")
    seed_orders(items)
    # print("********* AFTER ORDER-ITEMS")
    # seed_orders_items()
    # seed_items_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_orders_items()
    undo_orders()
    undo_reviews()
    # undo_items_likes()
    undo_items()
    undo_restaurants()
    undo_users()
    # Add other undo functions here
