import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAnItemThunk } from "../../store/restaurant";
import React from 'react';

const DeleteModal = ({ id }) => {
  console.log('--------------', id)
  const dispatch = useDispatch();
  const { closeModal } = useModal();


  const onDelete = async (e) => {
    e.preventDefault(e);
    dispatch(deleteAnItemThunk(id));
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
