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
      <p>
        <span>{restaurant.name}</span> <span>({restaurant.address})</span>
      </p>
      <p>
        {restaurant.reviews.length
          ? (
              restaurant.reviews.reduce((curr, prev) => curr + prev.stars, 0) /
              restaurant.reviews.length
            ).toFixed(1)
          : "New Restaurant!!!"}
      </p>
    </div>
  );
}

export default RestaurantTile;
