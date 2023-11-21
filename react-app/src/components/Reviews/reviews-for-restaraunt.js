import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurant } from "../../store/restaurant";
import { useHistory, useParams } from "react-router-dom";

function RestaurantReviews({ restaurant }) {
  const reviews = restaurant.reviews;
  return (
    <>
      <h3>What customers are saying</h3>
      <p>Reviews from people who've ordered here</p>
      {reviews.map((review) => (
        <div>
            <p>{review.created_at.slice(8, 16)}</p>
            <p>{review.user.first_name} {review.user.last_name[0]}.</p>
            <p>{review.review}</p>
        </div>
      ))}
    </>
  );
}

export default RestaurantReviews;
