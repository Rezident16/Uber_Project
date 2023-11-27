import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurant } from "../../store/restaurant";
import { useHistory, useParams } from "react-router-dom";
import Items from "../Items/restaurantItems";
import RestaurantReviews from "../Reviews/reviews-for-restaurant";
import CreateAReviewModal from "../Reviews/post-a-review";
import OpenModalButton from "../OpenModalButton";
import DeleteARestaurantModal from "./delete-a-restaurant";
import "./restaurant-details.css";
import UpdateRestaurant from "./update-restaurant";

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

  useEffect(() => {
    const initialFetch = async () => {
      const res = await dispatch(fetchRestaurant(restaurantId));
      if (res?.ok === false) {
        history.push("/not-found");
      }
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

  function parseHours(time) {
    let timeSplit = time.split(":");
    if (parseInt(timeSplit[0]) > 12) {
      timeSplit[0] = `${parseInt(timeSplit[0]) - 12}`;
      return timeSplit.join(":") + " PM";
    } else {
      timeSplit[0] = `${parseInt(timeSplit[0])}`;
      return timeSplit.join(":") + " AM";
    }
  }

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
    <div className="restaurant_detail_container_full">
      <header>
        <img src={restaurant.preview_img} alt=""></img>
        <h2>{restaurant.name}</h2>
        <div>
          <p>
            <i className="fa-solid fa-star" style={{ fontSize: "12px" }}></i>
            {reviews.length
              ? (
                  reviews.reduce((curr, prev) => curr + prev.stars, 0) /
                  reviews.length
                ).toFixed(1)
              : "New Restaurant!!!"}
          </p>
          {reviews.length ? (
            <p>
              ({reviews.length} {reviews.length === 1 ? "Rating" : "Ratings"})
            </p>
          ) : (
            <p>Be the first to leave a Review!!!</p>
          )}

          <span style={{ fontSize: "30px" }}> · </span>
          <p>{restaurant.category}</p>
          <span style={{ fontSize: "30px" }}> · </span>
          <p>
            <a href="#reviews" style={{ textDecoration: "underline" }}>
              Read Reviews
            </a>
          </p>
          <div className="hours">
            {currentTime < restaurant.hours_close ? (
              <p> Open until {parseHours(restaurant.hours_close)}</p>
            ) : (
              <p>Closed, opens at {parseHours(restaurant.hours_open)}</p>
            )}
          </div>
        </div>
        {user && user.id === restaurant.owner_id && (
          <div className="restaurant_details_buttons">
            <OpenModalButton
              className="restaurant_details_button_div"
              buttonText={"Update Your Restaurant"}
              modalComponent={<UpdateRestaurant />}
            />
            <OpenModalButton
              className="restaurant_details_button_div"
              buttonText={"Delete Your Restaurant"}
              modalComponent={<DeleteARestaurantModal />}
            />
          </div>
        )}
      </header>

      <Items restaurant={restaurant} />

      <div id="reviews">
        <RestaurantReviews restaurant={restaurant} />
      </div>

      {hasOrdered && hasNoReview && (
        <OpenModalButton
          buttonText={"Post Your Review"}
          modalComponent={<CreateAReviewModal />}
        />
      )}
    </div>
  );
}

export default RestaurantDetailPage;
