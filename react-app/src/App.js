import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Restaurants from "./components/Restaurants";
import CreateRestaurant from "./components/Restaurants/create-restaurant";
import updateRestaurant from "./store/restaurant";
import UpdateRestaurant from "./components/Restaurants/update-restaurant";
import GetRestaurants from "./components/Restaurants";
import RestaurantItemsFunc from "./components/Items/restaurantItems";
import RestaurantDetailPage from "./components/Restaurants/restaurant-details-page";
import { loadCart } from "./store/cart";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    console.log("SET CART COOKIE");
    const cookie = localStorage.getItem("cart");
    if (cookie) {
      dispatch(loadCart(JSON.parse(cookie)));
    }
  }, []);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/restaurants/new">
            <CreateRestaurant />
          </Route>
          <Route exact path="/restaurants/:restaurantId">
            <RestaurantDetailPage />
          </Route>
          <Route path="/restaurants/:restaurantId/edit">
            <UpdateRestaurant />
          </Route>
          <Route path="/restaurants">
            <GetRestaurants />
          </Route>
          {/* delete after test */}
          <Route path="/restaurants/restaurantId/items">
            <RestaurantItemsFunc />
          </Route>
          <Route>
            <h1>404 Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
