import { useModal } from "../../context/Modal";
import { addToCart } from "../../store/cart";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function ItemModal({ item }) {
  const cart = useSelector((state) => state.cart);
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [Qty, setQty] = useState(1);

  const options = () => {
    const optionsArr = [];
    for (let i = 1; i < 101; i++) {
      optionsArr.push(i);
    }
    return optionsArr;
  };

  const AddToCart = async (e) => {
    e.preventDefault();
    dispatch(addToCart(item, Qty));
    closeModal();
  };

  useEffect(() => {
    if (cart[item.id] != null) {
      setQty(cart[item.id].qty);
    }
  }, []);

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.price}</p>
      <p>{item.description}</p>
      {/* item likes */}
      <img src={item.preview_img} className="img" alt="" />
      <form onSubmit={AddToCart}>
        <select value={Qty} onChange={(e) => setQty(e.target.value)}>
          {options().map((option) => (
            <option value={option} key={option}>
              {" "}
              {option}{" "}
            </option>
          ))}
        </select>
        <button>
          {" "}
          Add {Qty} To Cart • ${(item.price * Qty).toFixed(2)}
        </button>
      </form>
    </div>
  );
}

export default ItemModal;
