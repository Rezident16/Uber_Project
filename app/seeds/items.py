from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_items():
    burger = Item (
        restaurant_id = 1,
        name="Burger",
        description="The Classic Burger: A succulent, flame-grilled beef patty with melted cheddar,crisp lettuce, ripe tomatoes, pickles,ketchup, and mayo, all sandwiched between a toasted bun.",
        category = "Main",
        preview_img="https://static.vecteezy.com/system/resources/previews/021/952/564/original/free-tasty-hamburger-on-transparent-background-free-png.png",
        price=10.99,
        is_alcohol = False
    )

    salad = Item (
        restaurant_id = 1,
        name="Salad",
        description=""""The Garden Salad: Fresh mixed greens, cherry tomatoes, cucumber
        slices, shredded carrots, and red onion, tossed in a zesty vinaigrette
        dressing for a crisp and refreshing experience.""""",
        category = "Starter",
        preview_img="https://png.pngtree.com/png-clipart/20230518/original/pngtree-mixed-vegetable-salad-png-image_9164813.png",
        price=6.99,
        is_alcohol = False
    )

    filet_mignon = Item (
        restaurant_id = 2,
        name="Filet Mignon",
        description="""Filet Mignon: A succulent, perfectly seared steak, seasoned to
        perfection and served with a rich red wine reduction for an exquisite dining
        experience.""",
        category = "Main",
        preview_img="https://static.vecteezy.com/system/resources/previews/032/547/056/non_2x/grilled-filet-mignon-steak-on-a-plate-isolated-ai-generative-free-png.png",
        price=34.99,
        is_alcohol = False
    )

    old_fashion = Item (
        restaurant_id = 2,
        name="Old Fashion",
        description="""The Old Fashioned: A timeless blend of sugar, bitters, bourbon,
        and citrus twist over ice, delivering a classic and sophisticated cocktail
        experience.""",
        category = "Drink",
        preview_img="https://thumbnail.imgbin.com/9/18/8/imgbin-old-fashioned-negroni-cocktail-black-russian-long-island-iced-tea-tea-in-the-united-kingdom-cFcL47HDvBLT3KARYXeYg6s1E_t.jpg",
        price=12.99,
        is_alcohol = True
    )

    pizza = Item (
        restaurant_id = 3,
        name="Pizza",
        description="""The Classic Pizza: Perfect crust, tangy tomato sauce,
        melted mozzarella, and your favorite toppings for a savory delight in
        every bite""",
        category = "Main",
        preview_img="https://w7.pngwing.com/pngs/404/908/png-transparent-california-style-pizza-sicilian-pizza-neapolitan-pizza-neapolitan-cuisine-pizza-food-cheese-recipe-thumbnail.png",
        price=15.99,
        is_alcohol = False
    )

    coke = Item (
        restaurant_id = 3,
        name="Coke",
        description="""Coca-Cola: The classic, refreshing blend of caramel sweetness
        and fizzy perfection in every sip.""",
        category = "Drink",
        preview_img="https://assets.stickpng.com/thumbs/580b57fbd9996e24bc43c0de.png",
        price=1.99,
        is_alcohol = False
    )

    hotdog = Item (
        restaurant_id = 4,
        name="Hot-Dog",
        description="""The Classic Hot Dog: Juicy grilled sausage in a soft bun,
        topped with mustard, ketchup, and relish for a simple and satisfying treat.""",
        category = "Main",
        preview_img="https://banner2.cleanpng.com/20180316/qae/kisspng-hot-dog-clip-art-hot-dog-png-transparent-images-5aac44cea781b2.5614952115212392466861.jpg",
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
        preview_img="https://icon2.cleanpng.com/20180622/qz/kisspng-buffalo-wing-buffalo-wild-wings-ann-arbor-restaura-bbq-chicken-wings-5b2cb021b95ec6.6238857215296553297593.jpg",
        price=8.99,
        is_alcohol = False
    )


    db.session.add(burger)
    db.session.add(salad)
    db.session.add(filet_mignon)
    db.session.add(old_fashion)
    db.session.add(pizza)
    db.session.add(coke)
    db.session.add(hotdog)
    db.session.add(hot_wings)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
