import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteAReviewThunk } from "../../store/restaurant";

function DeleteAReviewModal({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deleteReview = (e) => {
    e.preventDefault();

    // console.log(review)
    dispatch(deleteAReviewThunk(review.id)).then(closeModal());
  };

  return (
    <div className="delete-review-modal">
      <h1>Confirm Delete</h1>
      <span id="delete-review-span">
        Are you sure you want to delete this review?
      </span>
      <button
        className="confirm-delete"
        style={{ cursor: "pointer" }}
        onClick={deleteReview}
      >
        Yes (Delete Review)
      </button>
      <button
        className="do-not-delete"
        style={{ cursor: "pointer" }}
        onClick={closeModal}
      >
        No (Keep Review)
      </button>
    </div>
  );
}

export default DeleteAReviewModal;
