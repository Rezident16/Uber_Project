import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurant } from "../../store/restaurant";
import { useHistory, useParams } from "react-router-dom";
import Items from "../Items/restaurantItems";
import RestaurantReviews from "../Reviews/reviews-for-restaurant";
import CreateAReviewModal from "../Reviews/post-a-review";
import OpenModalButton from "../OpenModalButton";
import DeleteARestaurantModal from "./delete-a-restaurant";

function RestaurantDetailPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { restaurantId } = useParams();
  const user = useSelector((state) => state.session.user);
  const restaurant = useSelector((state) => state.restaurant);
  const reviews = restaurant.reviews;
  const orders = restaurant.orders;
  let hasNoReview = false;
  let hasOrdered = false;
  // console.log('---------', user)
  // console.log('----------', orders)

  useEffect(() => {
    const initialFetch = async () => {
      const res = await dispatch(fetchRestaurant(restaurantId));
      if (!res?.owner_id) history.push("/restaurants");
    };
    initialFetch();
  }, [dispatch]);

  if (!restaurant?.owner_id) return null;

  if (restaurantId != restaurant.id) return null;

  let hours = new Date().getHours();
  // let AMorPM = hours >= 12 && hours < 24 ? "PM" : "AM";
  let minutes = new Date().getMinutes();
  if (minutes === 0 || minutes < 10) minutes = `0${minutes}`;
  let currentTime = `${hours}:${minutes}`;

  if (user) {
    hasOrdered = orders?.some(
      (order) => order.user_id == user.id && order.restaurant_id == restaurantId
    );
    hasNoReview = !reviews?.some(
      (review) =>
        review.user_id == user.id && restaurant.id == review.restaurant_id
    );
  }

  return (
    <>
      <header>
        <img src={restaurant.preview_img} alt=""></img>
        <h2>{restaurant.name}</h2>
        <div>
          <i className="fa-solid fa-star"></i>
          <p>
            {reviews.length
              ? (
                  reviews.reduce((curr, prev) => curr + prev.stars, 0) /
                  reviews.length
                ).toFixed(1)
              : "New Restaurant!!!"}
          </p>
          {reviews.length ? (
            <p>
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </p>
          ) : (
            <p>Be the first to leave a Review!!!</p>
          )}
          {currentTime < restaurant.hours_close ? (
            <p> Open until {restaurant.hours_close}</p>
          ) : (
            <p>closed</p>
          )}
        </div>
      </header>

      <RestaurantReviews restaurant={restaurant} />

      {hasOrdered && hasNoReview && (
        <OpenModalButton
          buttonText={"Post Your Review"}
          modalComponent={<CreateAReviewModal />}
        />
      )}
      {user && user.id === restaurant.owner_id && (
        <OpenModalButton
          buttonText={"Delete Your Restaurant"}
          modalComponent={<DeleteARestaurantModal />}
        />
      )}
      <Items restaurant={restaurant} />
    </>
  );
}

export default RestaurantDetailPage;
