import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAnItemThunk } from "../../store/restaurant";
import React from "react";
import { removeFromCart } from "../../store/cart";

const DeleteModal = ({ id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const restaurant = useSelector((state) => state.restaurant);
  const item = Object.values(restaurant.items).find((item) => item.id == id);
  const onDelete = async (e) => {
    e.preventDefault(e);
    dispatch(deleteAnItemThunk(id));
    dispatch(removeFromCart(item));
    closeModal();
  };

  return (
    <div className="delete-item-modal">
      <h1>Confirm Delete</h1>
      <span id="delete-item-span">
        Are you sure you want to delete this item?
      </span>
      <button
        className="confirm-delete"
        style={{ cursor: "pointer" }}
        onClick={onDelete}
      >
        Yes (Delete Item)
      </button>
      <button
        className="do-not-delete-item"
        style={{ cursor: "pointer" }}
        onClick={closeModal}
      >
        No (Keep Item)
      </button>
    </div>
  );
};

export default DeleteModal;
