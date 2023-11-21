import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartQty, removeFromCart } from "../../store/cart";
import { useEffect } from "react";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const [Qty, setQty] = useState();

  const options = () => {
    const optionsArr = [];
    for (let i = 1; i < 101; i++) {
      optionsArr.push(i);
    }
    return optionsArr;
  };

  useEffect(() => {
    setQty(item.qty);
  }, [item]);

  return (
    <div>
      <img src={item.preview_img} />
      <div>{item.name}</div>
      <div>
        <select
          onChange={(e) => {
            if (e.target.value === "remove") {
              dispatch(removeFromCart(item));
            } else {
              dispatch(updateCartQty(item, e.target.value));
            }
          }}
          value={Qty}
        >
          <option value="remove">Remove</option>
          {options().map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <div>${(item.price * Qty).toFixed(2)}</div>
      </div>
    </div>
  );
}

export default CartItem;