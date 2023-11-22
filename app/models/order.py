from . import db, add_prefix_for_prod

# orders_items,
add_prefix_for_prod
from .db import environment, SCHEMA
from .orders_items import orders_items

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='CASCADE'), nullable=False) #confirm after users are created
    created_at = db.Column(db.DateTime) #Check migrations file
    is_complete = db.Column(db.Boolean, default=False)
    address = db.Column(db.String, nullable=False)
    price = db.Column(db.Float)
    notes = db.Column(db.String)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id"), ondelete='CASCADE'), nullable=False)

    user = db.relationship("User", back_populates="orders")
    restaurant = db.relationship("Restaurant", back_populates="orders")
    items = db.relationship("Item", secondary=orders_items, back_populates='orders', passive_deletes=True)

    def to_dict(self):
        # create a list of tuples formatted like (item_id, quantity)
        item_quantities = db.session.query(orders_items.c.item_id, db.func.count()).filter_by(order_id = self.id).group_by(orders_items.c.item_id).all()

        # map those tuples to a dict
        items = {}
        for key, val in item_quantities:
            items[key] = val
        
        return {
            'id': self.id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'is_complete': self.is_complete,
            'address': self.address,
            'price': self.price,
            'restaurant_id': self.restaurant_id,
            'user': self.user.to_dict(),
            'restaurant': self.restaurant.to_dict_no_user(),
            # include quantities in the to_dict method
            'items': [item.to_dict_with_quantity(quantity = items[item.id]) for item in self.items],
            'notes': self.notes
        }

    def to_dict_no_user(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'is_complete': self.is_complete,
            'address': self.address,
            'price': self.price,
            'restaurant_id': self.restaurant_id,
            'notes': self.notes
        }
    
    def to_dict_no_user_with_items(self):

        item_quantities = db.session.query(orders_items.c.item_id, db.func.count()).filter_by(order_id = self.id).group_by(orders_items.c.item_id).all()

        # map those tuples to a dict
        items = {}
        for key, val in item_quantities:
            items[key] = val
        return {
            'id': self.id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'is_complete': self.is_complete,
            'address': self.address,
            'price': self.price,
            'restaurant_id': self.restaurant_id,
            'notes': self.notes,
            'restaurant': self.restaurant.to_dict_no_user(),
            'items': [item.to_dict_with_quantity(quantity = items[item.id]) for item in self.items]
        }
