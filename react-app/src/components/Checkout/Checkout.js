import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import { clearCart, submitOrder } from "../../store/cart";
import "./checkout.css";

function CheckoutItem() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const history = useHistory();
  const { setModalContent } = useModal();

  const [address, setAddress] = useState(user?.address ? user.address : "");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const cartItems = Object.values(cart);
  const restaurantOrders = {};

  cartItems.forEach((item) => {
    restaurantOrders[item.restaurant.id] = {
      ...restaurantOrders[item.restaurant.id],
      [item.id]: item,
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    if (!user.user) {
      setModalContent(<LoginFormModal />);
      return;
    }

    const errorsObj = {};
    if (!address) {
      errorsObj.address = "Address is required";
    }

    cartItems.forEach((item) => {
      if (item.is_alcohol) {
        const bday = new Date(user.birthday);
        const today = new Date();
        const youngestAllowedAge = new Date(
          today.getFullYear() - 21,
          today.getMonth(),
          today.getDate()
        );
        if (bday < youngestAllowedAge) {
          errorsObj.age =
            "Must be 21 years or older to purchase alcohol. Please remove item from cart to continue.";
        }
      }
    });
    setErrors(errorsObj);
    let res;
    if (!Object.values(errorsObj).length) {
      for (const [restaurantId, items] of Object.entries(restaurantOrders)) {
        const itemsArr = [];
        for (const item of Object.values(items)) {
          for (let i = 0; i < item.qty; i++) {
            itemsArr.push(item.id);
          }
        }
        const bodyOrder = {
          address: address,
          notes: notes,
          item_ids: itemsArr,
        };
        res = await dispatch(submitOrder(bodyOrder, restaurantId));
      }
      if (!res.errors) {
        await dispatch(clearCart());
        history.push("/current");
      } else {
        errorsObj.errors = res.errors;
        setErrors(errorsObj);
      }
    }
  };

  function displayItems() {
    const restaurantArr = Object.entries(restaurantOrders);
    return restaurantArr.map((restaurant) => {
      return (
        <div key={restaurant[0]} className="restaurant_container">
          <h2>{Object.values(restaurant[1])[0].restaurant.name}</h2>
          <div className="order_items">
            {Object.values(restaurant[1]).map((item) => {
              return (
                <div key={item.id} className="item_container">
                  <img src={item.preview_img} alt="" />
                  <p className="item_qty_container">{item.qty}</p>
                  <p>${(item.price * item.qty).toFixed(2)}</p>
                  {item.is_alcohol && (
                    <div>
                      Item contains alcohol, must be 21 years or older to
                      purchase.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <form className="checkout_form" onSubmit={handleSubmit}>
        <label className="form_element address_form_element">
          Address
          <input
            className="form_element_borders"
            placeholder="Delivery Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </label>
        {errors.address && <p className="errors">{errors.address}</p>}
        <label className="form_element" style={{ flexDirection: "column" }}>
          Delivery instructions
          <textarea
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            rows="10"
            cols="45"
            className="form_element_borders"
            placeholder="Leave delivery instructions for your rider..."
          />
        </label>
        {displayItems()}
        {errors.age && <p className="errors">{errors.age}</p>}
        <button className="checkout_button">Place Order</button>
      </form>
    </>
  );
}

export default CheckoutItem;
