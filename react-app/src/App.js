import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateRestaurant from "./components/Restaurants/create-restaurant";
import UpdateRestaurant from "./components/Restaurants/update-restaurant";
import GetRestaurants from "./components/Restaurants";
import RestaurantItemsFunc from "./components/Items/restaurantItems";
import RestaurantDetailPage from "./components/Restaurants/restaurant-details-page";
import { loadCart } from "./store/cart";
import CheckoutItem from "./components/Checkout/Checkout";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import UserProfile from "./components/UserProfile";
import LandingPage from "./components/LandingPage";
import { loadCartThunk } from "./store/cart";
import PageNotFound from "./components/Navigation/PageNotFound";
import Footer from "./components/Navigation/footer";

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
      // dispatch(loadCart(JSON.parse(cookie)));
      dispatch(loadCartThunk(JSON.parse(cookie)));
    }
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
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
          <Route exact path="/restaurants">
            <GetRestaurants />
          </Route>
          <Route path="/checkout">
            <CheckoutItem />
          </Route>
          <Route path="/current">
            <UserProfile />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
      <Route path="/:notHome">
        <Footer />
      </Route>
    </>
  );
}

export default App;
