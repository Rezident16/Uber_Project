import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurant } from "../../store/restaurant";
import { useHistory, useParams } from "react-router-dom";
import RestaurantItemsFunc from "../Items/restaurantItems";

function RestaurantDetailPage() {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
  }, [dispatch]);

  if (!restaurant?.owner_id) {
    return null;
  }

  return (
    <>
      <h1>Our Stuff</h1>

      <RestaurantItemsFunc restaurant={restaurant} />
    </>
  );
}

export default RestaurantDetailPage;
