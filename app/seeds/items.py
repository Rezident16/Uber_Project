from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from ..models.item import Item

# Adds a demo user, you can add other users here if you want
def seed_items():
    burger = Item (
        restaurant_id = 1,
        name="Burger",
        description="The Classic Burger: A succulent, flame-grilled beef patty with melted cheddar,crisp lettuce, ripe tomatoes, pickles,ketchup, and mayo, all sandwiched between a toasted bun.",
        category = "Main",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/burger.png",
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
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/salad.png",
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
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/filet-mignon.png",
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
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/old-fashioned.jpg",
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

    mc_chicken = Item (
        restaurant_id = 5,
        name="McChicken",
        description="""The McChicken: a McDonald's sandwich with a breaded chicken patty,
        lettuce, and mayo in a sesame seed bun.""",
        category = "Main",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/mcchicken.jpeg",
        price=1.99,
        is_alcohol = False
    )

    fries = Item (
        restaurant_id = 5,
        name="Fries",
        description="""McDonald's fries: golden and crispy potato sticks, seasoned to
        perfection for a deliciously iconic snack.""",
        category = "Side",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/mcfries.jpeg",
        price=2.99,
        is_alcohol = False
    )

    baconator = Item (
        restaurant_id = 6,
        name="Baconator",
        description="""The Wendy's Baconator: a hearty burger piled high with fresh, never
        frozen beef patties, crispy bacon, and melted cheese, creating a savory delight
        for burger enthusiasts.""",
        category = "Main",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/baconator.jpeg",
        price=5.99,
        is_alcohol = False
    )

    frosty = Item (
        restaurant_id = 6,
        name="Frosty",
        description="""The Wendy's Frosty: a creamy and indulgent dessert, blending rich chocolate or vanilla
        flavors into a smooth, frosty treat that strikes the perfect balance between shake and ice cream.""",
        category = "Dessert",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/frosty.jpg",
        price=.99,
        is_alcohol = False
    )

    chicken_burrito = Item (
        restaurant_id = 7,
        name="Chicken Burrito",
        description="""Chipotle's Chicken Burrito: Grilled chicken, rice, beans, salsa, cheese, and sour cream in a warm
        tortilla—a delicious Mexican-inspired bite.""",
        category = "Main",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/burrito.jpeg",
        price=7.99,
        is_alcohol = False
    )

    steak_bowl = Item (
        restaurant_id = 7,
        name="Steak Bowl",
        description="""Chipotle's Steak Bowl: Succulent grilled steak served on a bed of cilantro-lime rice,
        paired with black beans, salsa, cheese, and your choice of toppings for a hearty and customizable bowl.""",
        category = "Main",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/steakbowl.jpeg",
        price=7.99,
        is_alcohol = False
    )

    cajun_fries = Item (
        restaurant_id = 8,
        name="Cajun Fries",
        description="""Five Guys Cajun Fries: Irresistible hand-cut fries seasoned with a bold blend of spices,
        offering a flavorful and satisfying twist to the classic potato fry experience.""",
        category = "Side",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/cajunfries.jpeg",
        price=3.99,
        is_alcohol = False
    )

    fiveguys_burger = Item (
        restaurant_id = 8,
        name="Burger",
        description="""Five Guys Burger: Double the juicy beef, endless toppings,
        all in a soft bun—a classic indulgence.""",
        category = "Main",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/fiveguysburger.jpeg",
        price=7.99,
        is_alcohol = False
    )

    quesarito = Item (
        restaurant_id = 9,
        name="Quesarito",
        description="""Taco Bell Quesarito: Beef, rice, cheese, and chipotle sauce in a grilled tortilla—a
        delicious blend of flavors""",
        category = "Main",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/quesarito.jpeg",
        price=4.99,
        is_alcohol = False
    )

    crunchwrap = Item (
        restaurant_id = 9,
        name="Crunch Wrap Supreme",
        description="""Crunchwrap Supreme: Beef, lettuce, tomatoes, cheese, and sour cream in a grilled
        tortilla with a crispy tostada shell for a satisfying crunch..""",
        category = "Main",
        preview_img="https://savoryscoot.s3.amazonaws.com/seeder-images/crunchwrapsupreme.jpeg",
        price=7.99,
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
    db.session.add(mc_chicken)
    db.session.add(fries)
    db.session.add(baconator)
    db.session.add(frosty)
    db.session.add(chicken_burrito)
    db.session.add(steak_bowl)
    db.session.add(cajun_fries)
    db.session.add(fiveguys_burger)
    db.session.add(crunchwrap)
    db.session.add(quesarito)

    db.session.commit()


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