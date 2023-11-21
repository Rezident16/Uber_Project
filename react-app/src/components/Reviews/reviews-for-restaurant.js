import React, { useState, useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteAReviewModal from "./delete-a-review";
import { useSelector } from "react-redux";

function RestaurantReviews() {
  const user = useSelector(state => state.session.user)
  const restaurant = useSelector(state => state.restaurant)
  const reviews = restaurant.reviews;

  console.log('RESTAURANT',restaurant)
  if (!restaurant) return null
  return (
    <>
      <h3>What customers are saying</h3>
      <p>Reviews from people who've ordered here</p>
      {reviews?.map((review) => (
        <div>
          <p>{review.created_at.slice(8, 16)}</p>
          <p>
            {review.user.first_name} {review.user.last_name[0]}.
          </p>
          <p>{review.review}</p>
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
