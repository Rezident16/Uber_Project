import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom/";
import "./Cart.css";
import { clearCart } from "../../store/cart";
import React from "react";

function CartModal() {
  const cart = useSelector((state) => state.cart);
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const cartItems = Object.values(cart);

  useEffect(() => {
    let newTotal = 0;
    cartItems.forEach((item) => {
      newTotal += parseFloat((item.price * parseInt(item.qty)).toFixed(2));
    });
    setTotal(parseFloat(newTotal.toFixed(2)));
  }, [cart]);

  return (
    <div className="cart_modal">
      <div className="all_cart_items">
        {cartItems.length ? (
          cartItems.map((item) => (
            <CartItem item={item} key={item.id}></CartItem>
          ))
        ) : (
          <p>Nothing in cart yet!</p>
        )}
      </div>
      <div className="cart_buttons">
        {total > 0 && (
          <div>
            <div>Subtotal ${total}</div>
            <Link
              to="/checkout"
              className="modal_buttons"
              id="checkout-button"
              onClick={(e) => {
                if (!cartItems.length) {
                  e.preventDefault();
                } else {
                  closeModal();
                }
              }}
            >
              Checkout
            </Link>
          </div>
        )}

        {cartItems.length ? (
          <button
            className="modal_buttons"
            onClick={(e) => {
              e.preventDefault();
              dispatch(clearCart());
            }}
          >
            Clear Cart
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default CartModal;
