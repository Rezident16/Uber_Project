import { useEffect } from "react";
import RestaurantForm from "./restaurant-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchRestaurant } from "../../store/restaurant";
import React from 'react';
function UpdateRestaurant() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const restaurant = useSelector((state) => state.restaurant);

  useEffect(() => {
    const initialFetch = async () => {
      const res = await dispatch(fetchRestaurant(restaurantId));
      if (!res?.owner_id) history.push("/restaurants");
    };
    initialFetch();
  }, [dispatch]);

  if (!restaurant?.owner_id) {
    return null;
  }
  // console.log(restaurant)
  if (!sessionUser || sessionUser?.id !== restaurant?.owner_id) {
    history.push("/restaurants");
  }

  return (
    <div>
      <h3 className="form_type">Update</h3>
      <RestaurantForm formAction="edit" restaurant={restaurant} />
    </div>
  );
}

export default UpdateRestaurant;
