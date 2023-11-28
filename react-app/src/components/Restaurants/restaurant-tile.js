import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React from "react";

function RestaurantTile({ restaurant }) {
  const history = useHistory();
  function directToRestaurant() {
    history.push(`/restaurants/${restaurant.id}`);
  }

  return (
    <div className="restaurant-tile" onClick={directToRestaurant}>
      <img src={restaurant.preview_img} alt={restaurant.name} />
      <p className="restaurant-title">
        <span>
          {restaurant.name} ({restaurant.address})
        </span>

        {restaurant?.reviews?.length ? (
          <span className="restaurant-rating">
            {(
              restaurant.reviews.reduce((curr, prev) => curr + prev.stars, 0) /
              restaurant.reviews.length
            ).toFixed(1)}
          </span>
        ) : null}
      </p>
      <p className="order-time">
        {restaurant.min_order_time}-{restaurant.max_order_time} minutes
      </p>
    </div>
  );
}

export default RestaurantTile;
