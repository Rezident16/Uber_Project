from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

# Adds a demo user, you can add other users here if you want
def seed_reviews():
    mason_review = Review(
        user_id=1, restaurant_id=2, review='Indulge in whimsical flavors reminiscent of childhood, a delightful treat for ice cream lovers seeking nostalgic joy.', stars=4, created_at=date(2021, 10, 2))
    zo_review = Review(
        user_id=2, restaurant_id=1, review='Relish juicy, flavorful patties in a laid-back atmosphere, a go-to spot for satisfying burger cravings.', stars=3, created_at=date(2021, 1, 21))
    andrei_review = Review(
        user_id=3, restaurant_id=4, review='Savor crispy, cheesy goodness with a variety of toppings, offering a delicious experience for pizza enthusiasts.', stars=5, created_at=date(2023, 9, 21))
    brian_review = Review(
        user_id=4, restaurant_id=3, review='Delight in smoky, tender meats, a haven for barbecue aficionados seeking mouthwatering delights.', stars=3, created_at=date(2022, 11, 11))
    ronald_review = Review(
        user_id=5, restaurant_id=2, review='Dive into juicy, flavorful patties at Shaggy Burger, where every bite is a satisfying journey through a laid-back burger paradise.', stars=4, created_at=date(2022, 11, 21))
    wendy_review = Review(
        user_id=6, restaurant_id=3, review="Experience crispy, cheesy goodness at Fred's Pizza, where a plethora of toppings create a delicious symphony for pizza enthusiasts.", stars=4, created_at=date(2022, 10, 21))
    demo_review = Review(
        user_id=7, restaurant_id=2, review="Indulge in the laid-back ambiance and juicy, flavorful patties at Shaggy Burger, promising a relaxed retreat for burger enthusiasts seeking delicious simplicity.", stars=4, created_at=date(2021, 1, 21))
    shaggy_review = Review(
        user_id=8, restaurant_id=2, review="Tantalize your taste buds with Shaggy Burger's succulent, flavorful patties, delivering a casual dining experience that's a delight for burger aficionados.", stars=2, created_at=date(2020, 11, 4))
    scooby_review = Review(
        user_id=9, restaurant_id=4, review="Delight in the tantalizing array of smoky, tender meats at Velma BBQ Grill, a haven for barbecue lovers craving robust, unforgettable flavors.", stars=4, created_at=date(2021, 1, 15))
    fred_review = Review(
        user_id=10, restaurant_id=4, review="Embark on a flavorsome adventure at Velma BBQ Grill, where the aroma of smoky, tender meats entices barbecue enthusiasts to relish every mouthwatering bite.", stars=2, created_at=date(2023, 1, 1))
    
    db.session.add(mason_review)
    db.session.add(zo_review)
    db.session.add(andrei_review)
    db.session.add(brian_review)
    db.session.add(ronald_review)
    db.session.add(wendy_review)
    db.session.add(demo_review)
    db.session.add(shaggy_review)
    db.session.add(scooby_review)
    db.session.add(fred_review)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()
