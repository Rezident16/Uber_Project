import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createAReviewThunk } from "../../store/restaurant";
import "./reviews.css";

function CreateAReviewModal() {
  const restaurant = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [reviewText, setReviewText] = useState("");
  const [activeRating, setActiveRating] = useState(0);
  const [rating, setRating] = useState(0);
  const disabled = reviewText.length < 10 || rating === 0;
  const className = disabled ? "not-confirmed-review" : "confirm-review";
  const [errors, setErrors] = useState({});

  const onChange = (number) => {
    setRating(parseInt(number));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorsObj = {};

    const review = {
      review: reviewText,
      stars: rating,
    };

    if (reviewText.length > 255)
      errorsObj.review = "Review must be shorter than 255 characters";
    if (rating < 1 || rating > 5) errorsObj.stars = "Please select your stars";

    if (!Object.keys(errorsObj).length) {
      dispatch(createAReviewThunk(restaurant.id, review)).then(closeModal());
    }

    setErrors(errorsObj);
  };

  if (!restaurant) return null;

  return (
    <div className="create-a-review-modal">
      <h1
        id="review-header"
        style={{
          marginBottom: "5px",
        }}
      >
        How was order?
      </h1>
      {errors.review && (
        <p
          style={{
            fontSize: "12px",
            color: "red",
            marginTop: "0",
          }}
        >
          *{errors.review}
        </p>
      )}
      {errors.stars && (
        <p
          style={{
            fontSize: "12px",
            color: "red",
            marginTop: "0",
          }}
        >
          *{errors.stars}
        </p>
      )}
      <textarea
        id="review-text"
        rows="8"
        name="review"
        placeholder="Leave your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <div className="rating-input">
        <div
          onMouseEnter={() => {
            setActiveRating(1);
          }}
          onMouseLeave={() => {
            setActiveRating(rating);
          }}
          onClick={() => {
            onChange(1);
          }}
        >
          <i
            className={
              activeRating >= 1 || rating >= 1
                ? "fa-solid fa-star"
                : "fa-regular fa-star"
            }
          ></i>
        </div>
        <div
          onMouseEnter={() => {
            setActiveRating(2);
          }}
          onMouseLeave={() => {
            setActiveRating(rating);
          }}
          onClick={() => {
            onChange(2);
          }}
        >
          <i
            className={
              activeRating >= 2 || rating >= 2
                ? "fa-solid fa-star"
                : "fa-regular fa-star"
            }
          ></i>
        </div>
        <div
          onMouseEnter={() => {
            setActiveRating(3);
          }}
          onMouseLeave={() => {
            setActiveRating(rating);
          }}
          onClick={() => {
            onChange(3);
          }}
        >
          <i
            className={
              activeRating >= 3 || rating >= 3
                ? "fa-solid fa-star"
                : "fa-regular fa-star"
            }
          ></i>
        </div>
        <div
          onMouseEnter={() => {
            setActiveRating(4);
          }}
          onMouseLeave={() => {
            setActiveRating(rating);
          }}
          onClick={() => {
            onChange(4);
          }}
        >
          <i
            className={
              activeRating >= 4 || rating >= 4
                ? "fa-solid fa-star"
                : "fa-regular fa-star"
            }
          ></i>
        </div>
        <div
          onMouseEnter={() => {
            setActiveRating(5);
          }}
          onMouseLeave={() => {
            setActiveRating(rating);
          }}
          onClick={() => {
            onChange(5);
          }}
        >
          <i
            className={
              activeRating >= 5 || rating >= 5
                ? "fa-solid fa-star"
                : "fa-regular fa-star"
            }
          ></i>
        </div>
        <span style={{ fontSize: "15px", marginLeft: "5px" }}>Stars</span>
      </div>
      <button className={className} disabled={disabled} onClick={handleSubmit}>
        Submit Your Review
      </button>
    </div>
  );
}

export default CreateAReviewModal;
