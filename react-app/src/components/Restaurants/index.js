import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../../store/restaurants";
import RestaurantTile from "./restaurant-tile";

import "./restaurant.css";

function Restaurants() {
  const dispatch = useDispatch();
  const restaurantsObj = useSelector((state) => state.restaurants);
  const restaurants = Object.values(restaurantsObj);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  if (!restaurants) return null;

  return (
    <div id="restaurant-tile-container">
      {restaurants &&
        restaurants.map((restaurant) => (
          <RestaurantTile key={restaurant.id} restaurant={restaurant} />
        ))}
    </div>
  );
}

export default Restaurants;
