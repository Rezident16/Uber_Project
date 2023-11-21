import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import { submitOrder } from "../../store/cart";

function CheckoutItem() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  // if (!user) return null

  const [address, setAddress] = useState(user?.address ? user.address : "");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const cartItems = Object.values(cart);
  const restaurantOrders = {};

  cartItems.forEach((item) => {
    restaurantOrders[item.restaurant_id] = {
      ...restaurantOrders[item.restaurant_id],
      item,
    };
  });

  const handleSubmit = async () => {
    if (!user) {
      setModalContent(<LoginFormModal />);
    }
    const errorsObj = {};
    if (!address) {
      errorsObj.address = "Address is required";
      setErrors(errorsObj);
    }

    if (!Object.values(errors).length) {
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
          items: itemsArr,
          user_id: user.id,
        };
        await dispatch(submitOrder(bodyOrder, restaurantId));
      }
    }
  };

  function displayItems() {
    const restaurantArr = Object.entries(restaurantOrders);
    console.log(restaurantArr);
  }

  displayItems();

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

        <button>Place Order</button>
      </form>
    </>
  );
}

export default CheckoutItem;
