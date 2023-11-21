import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom/";

function CartModal() {
  const cart = useSelector((state) => state.cart);
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const cartItems = Object.values(cart);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(0);
    cartItems.forEach((item) => {
      setTotal((total += item.price * item.qty));
    });
  }, [cart]);

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem item={item}></CartItem>
      ))}
      <div>Subtotal ${total}</div>
      <div>Add a note (delivery instructions)</div>
      <Link
        to="/checkout"
        onClick={(e) => {
          if (!cartItems.length) {
            e.preventDefault()
            closeModal()
        };
        }
    }
      >
        {" "}
        Checkout
      </Link>
    </div>
  );
}

export default CartModal
