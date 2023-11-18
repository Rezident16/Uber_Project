from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_items(all_users):
    burger = Item (
        restaurant_id = 1,
        name="Burger",
        description="The Classic Burger: A succulent, flame-grilled beef patty with melted cheddar,crisp lettuce, ripe tomatoes, pickles,ketchup, and mayo, all sandwiched between a toasted bun.",
        category = "Main",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/burger.png",
        price=10.99,
        is_alcohol = False,
        users = [all_users[1]]
    )

    salad = Item (
        restaurant_id = 1,
        name="Salad",
        description=""""The Garden Salad: Fresh mixed greens, cherry tomatoes, cucumber
        slices, shredded carrots, and red onion, tossed in a zesty vinaigrette
        dressing for a crisp and refreshing experience.""""",
        category = "Starter",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/salad.png",
        price=6.99,
        is_alcohol = False,
        users = [all_users[1]]
    )

    filet_mignon = Item (
        restaurant_id = 2,
        name="Filet Mignon",
        description="""Filet Mignon: A succulent, perfectly seared steak, seasoned to
        perfection and served with a rich red wine reduction for an exquisite dining
        experience.""",
        category = "Main",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/filet-mignon.png",
        price=34.99,
        is_alcohol = False,
        users = [all_users[0]]
    )

    old_fashion = Item (
        restaurant_id = 2,
        name="Old Fashion",
        description="""The Old Fashioned: A timeless blend of sugar, bitters, bourbon,
        and citrus twist over ice, delivering a classic and sophisticated cocktail
        experience.""",
        category = "Drink",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/old-fashioned.jpg",
        price=12.99,
        is_alcohol = True,
        users = [all_users[0]]
    )

    pizza = Item (
        restaurant_id = 3,
        name="Pizza",
        description="""The Classic Pizza: Perfect crust, tangy tomato sauce,
        melted mozzarella, and your favorite toppings for a savory delight in
        every bite""",
        category = "Main",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/pizza.png",
        price=15.99,
        is_alcohol = False
    )

    coke = Item (
        restaurant_id = 3,
        name="Coke",
        description="""Coca-Cola: The classic, refreshing blend of caramel sweetness
        and fizzy perfection in every sip.""",
        category = "Drink",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/coke.png",
        price=1.99,
        is_alcohol = False
    )

    hotdog = Item (
        restaurant_id = 4,
        name="Hot-Dog",
        description="""The Classic Hot Dog: Juicy grilled sausage in a soft bun,
        topped with mustard, ketchup, and relish for a simple and satisfying treat.""",
        category = "Main",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/hot-dog.jpg",
        price=3.99,
        is_alcohol = False
    )

    hot_wings = Item (
        restaurant_id = 4,
        name="Hot Wings",
        description="""Hot Wings: Crispy, spicy chicken wings with a fiery kick,
        perfect for spice lovers. Dip into cool ranch or blue cheese for a delicious
        experience.""",
        category = "Starter",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/hot-wings.jpg",
        price=8.99,
        is_alcohol = False
    )

    items = [burger, salad, filet_mignon, old_fashion, pizza, coke, hot_wings, hotdog]
    db.session.add(burger)
    db.session.add(salad)
    db.session.add(filet_mignon)
    db.session.add(old_fashion)
    db.session.add(pizza)
    db.session.add(coke)
    db.session.add(hotdog)
    db.session.add(hot_wings)
    db.session.commit()
    return items


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))
        # db.session.execute(text("DELETE FROM items; DELETE FROM sqlite_sequence WHERE name='items';"))


    db.session.commit()
