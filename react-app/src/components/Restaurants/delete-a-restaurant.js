import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteRestaurantThunk } from "../../store/restaurants";
import { removeRestaurant } from "../../store/restaurant";
import { removeRestaurantItemsFromCart } from "../../store/cart";

function DeleteARestaurantModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const restaurant = useSelector((state) => state.restaurant);

  const deleteRestaurant = (e) => {
    e.preventDefault();

    dispatch(deleteRestaurantThunk(restaurant.id))
      .then(dispatch(removeRestaurant()))
      .then(dispatch(removeRestaurantItemsFromCart(restaurant.id)))
      .then(closeModal());
    history.push("/restaurants");
  };

  return (
    <div className="delete-item-modal">
      <h1>Confirm Delete</h1>
      <span id="delete-item-span">
        Are you sure you want to remove this restaurant?
      </span>
      <button
        className="confirm-delete"
        style={{ cursor: "pointer" }}
        onClick={deleteRestaurant}
      >
        Yes (Delete Restaurant)
      </button>
      <button
        className="do-not-delete-item"
        style={{ cursor: "pointer" }}
        onClick={closeModal}
      >
        No (Keep Restaurant)
      </button>
    </div>
  );
}

export default DeleteARestaurantModal;
