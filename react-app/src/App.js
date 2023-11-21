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
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <>
              <h1>Home Page</h1>
              <Link to="/restaurants">Restaurants</Link>
              <Link to=""></Link>
            </>
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
          <Route path="/checkout">
            <CheckoutItem />
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
