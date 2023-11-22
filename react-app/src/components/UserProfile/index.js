import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./user.css";
import { getCurr } from "../../store/session";

export const helperFunc = (date) => {
  const parts = date.split(":");
  const newDateString = `${parts[0]}:${parts[1]}`;
  const addOnParts = newDateString.split(" ");
  let hours;
  let minutes;
  let ampm;
  if (addOnParts[4].split(":")[0] > 12) {
    hours = addOnParts[4].split(":")[0] - 12;
    minutes = addOnParts[4].split(":")[1];
    ampm = "PM";
  } else if (addOnParts[4].split(":")[0] == 12) {
    hours = addOnParts[4].split(":")[0];
    minutes = addOnParts[4].split(":")[1];
    ampm = "PM";
  } else {
    hours = addOnParts[4].split(":")[0];
    minutes = addOnParts[4].split(":")[1];
    ampm = "AM";
  }
  const finalTimeString = `${addOnParts[0]} ${addOnParts[1]} ${addOnParts[2]} ${addOnParts[3]} ${hours}:${minutes} ${ampm}`;
  return finalTimeString;
};

function UserProfile() {
  const user = useSelector((state) => state.session.user);
  const { setModalContent } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurr());
  }, [dispatch]);

  if (!user) {
    history.push("/restaurants");
    setModalContent(<LoginFormModal />);
    return null;
  }

  const linkToRestaurant = (id) => {
    return history.push(`/restaurants/${id}`);
  };

  const date = new Date(user.birthday);

  const isoDate = date.toISOString().split("T")[0];
  const userFormat = isoDate.split("-");
  const dateObject = new Date(`2000-${userFormat[1]}-1`);
  const monthAbbreviation = dateObject.toLocaleDateString("en-US", {
    month: "short",
  });
  user.birthday =
    `${userFormat[0]}` + ` ${monthAbbreviation}` + ` ${userFormat[2]}`;

  //   user.birthday = isoDate

  return (
    <div className="main_user_container">
      <h1>Account Info</h1>
      <div className="general_user_info_container">
        <h2>Your General Information</h2>
        <div>
          <h3>Username: </h3>
          <h4> {user.username}</h4>
        </div>
        <div>
          <h3>Email: </h3>
          <h4> {user.email}</h4>
        </div>
        <div>
          <h3>Birthday: </h3>
          <h4> {user.birthday}</h4>
        </div>
        <div>
          <h3>First Name: </h3>
          <h4> {user.first_name}</h4>
        </div>
        <div>
          <h3>Last Name: </h3>
          <h4> {user.last_name}</h4>
        </div>
        {/* <p>Email: {user.email}</p>
        <p>Birthday: {user.birthday}</p>
        <p>First Name: {user.first_name}</p>
        <p>Last Name: {user.last_name}</p> */}
        <>
          {user.address && (
            <div>
              <h3>Address: </h3>
              <h4>{user.address}</h4>
            </div>
          )}
        </>
      </div>
      <div className="all_orders_container">
        <h2>Past Orders</h2>
        {user.orders
          .sort((a, b) => {
            let aDate = new Date(a.created_at);
            let bDate = new Date(b.created_at);
            return bDate - aDate;
          })
          .map((order) => (
            <div key={order.id} className="individual_order_container">
              <div className="restaurant_order_container">
                <img
                  onClick={(e) => linkToRestaurant(order.restaurant.id)}
                  src={order.restaurant.preview_img}
                />
                <h3 onClick={(e) => linkToRestaurant(order.restaurant.id)}>
                  {order.restaurant.name}
                </h3>
              </div>
              <h3>Order Details:</h3>
              <div className="order_details_container">
                <h4>Order Total:</h4>
                <p> ${order.price.toFixed(2)}</p>
              </div>
              <div className="order_details_container">
                <h4>Ordered at:</h4>
                <p> {helperFunc(order.created_at.split("GMT")[0])}</p>
              </div>
              <div className="order_details_container">
                <h4>Delivery Address:</h4>
                <p> {order.address}</p>
              </div>
                {order.notes && (
                  <div className="order_details_container">
                    <h4>Order Notes:</h4>
                    <p> {order.notes}</p>
                  </div>
                )}
              <div className="item_container">
                {order.items.map((item) => (
                  <div key={item.id}>
                    {/* <div>{item.name}</div> */}
                    <div className="item_img_qty_container">
                      <img src={item.preview_img} />
                      <p className="item_qty_container">{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserProfile;
