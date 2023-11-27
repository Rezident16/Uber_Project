import OpenModalButton from "../OpenModalButton";
import DeleteAReviewModal from "./delete-a-review";
import { useSelector } from "react-redux";
import React from "react";
import "./reviews.css";

function RestaurantReviews() {
  const user = useSelector((state) => state.session.user);
  const restaurant = useSelector((state) => state.restaurant);
  const reviews = restaurant.reviews;

  if (!restaurant) return null;
  return (
    <>
      <h3 id="reviews-heading">What customers are saying</h3>
      <h4 id="reviews-subheading">Reviews from people who've ordered here</h4>
      {reviews?.map((review) => (
        <div key={review.id} className="review-tile">
          <p className="review-author">
            {review.user.first_name} {review.user.last_name[0]}.
          </p>
          <p className="review-date">{review.created_at.slice(8, 16)}</p>
          <p className="review-text">{review.review}</p>
          {user && user.id == review.user_id && (
            <OpenModalButton
              buttonText={"Delete"}
              modalComponent={<DeleteAReviewModal review={review} />}
            />
          )}
        </div>
      ))}
    </>
  );
}

export default RestaurantReviews;
