import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import { clearCart, submitOrder } from "../../store/cart";

function CheckoutItem() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const history = useHistory();
  const { setModalContent } = useModal();

  // if (!user) return null

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

    if (!user) {
      setModalContent(<LoginFormModal />);
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
          // console.log(bday, youngestAllowedAge, bday < youngestAllowedAge);
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
          // user_id: user.id,
        };
        res = await dispatch(submitOrder(bodyOrder, restaurantId));
      }
      if (!res.errors) {
        await dispatch(clearCart());
        history.push("/restaurants");
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
        <div key={restaurant[0]}>
          <h2>Restaurant: {Object.values(restaurant[1])[0].restaurant.name}</h2>
          <h3>Items:</h3>
          {Object.values(restaurant[1]).map((item) => {
            return (
              <div key={item.id}>
                <p>{item.qty}</p>
                <img src={item.preview_img} alt="" />
                <p>${(item.price * item.qty).toFixed(2)}</p>
                {item.is_alcohol && (
                  <p>
                    Item contains alcohol, must be 21 years or older to
                    purchase.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Address
          <input onChange={(e) => setAddress(e.target.value)} value={address} />
        </label>
        {errors.address && <p>{errors.address}</p>}
        <label>
          Leave you special instructions headers
          <textarea onChange={(e) => setNotes(e.target.value)} value={notes} />
        </label>
        {displayItems()}
        {errors.age && <p>{errors.age}</p>}
        <button>Place Order</button>
      </form>
    </>
  );
}

export default CheckoutItem;
