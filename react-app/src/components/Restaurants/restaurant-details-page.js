import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurant } from "../../store/restaurant";
import { useHistory, useParams } from "react-router-dom";
import RestaurantItemsFunc from "../Items/restaurantItems";

function RestaurantDetailPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurant);
  const reviews = restaurant.reviews;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId)).catch((e) => {
      history.push("/restaurants");
    });
  }, [dispatch]);

  if (isLoaded && !restaurant?.owner_id) {
    return <h1>404 Restaurant Does Not Exist</h1>;
  }

  if (!restaurant?.owner_id) return null;

  console.log(restaurant);

  return (
    <>
      <header>
        <img src={restaurant.preview_img}></img>
        <h2>{restaurant.name}</h2>
        <div>
          <i class="fa-solid fa-star"></i>
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
        </div>
      </header>

      {/* <RestaurantItemsFunc restaurant={restaurant} /> */}
    </>
  );
}

export default RestaurantDetailPage;
