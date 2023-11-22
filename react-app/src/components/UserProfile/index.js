import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

export const helperFunc = (date) => {
    const parts = date.split(':')
    const newDateString = `${parts[0]}:${parts[1]}`;
    const addOnParts = newDateString.split(' ')
    let hours
    let minutes
    let ampm
    if (addOnParts[4].split(':')[0] > 12) {
        hours = addOnParts[4].split(':')[0] - 12
        minutes = addOnParts[4].split(':')[1]
        ampm = 'PM'
    } else if (addOnParts[4].split(':')[0] == 12) {
        hours = addOnParts[4].split(':')[0]
        minutes = addOnParts[4].split(':')[1]
        ampm = 'PM'
    } else {
        hours = addOnParts[4].split(':')[0]
        minutes = addOnParts[4].split(':')[1]
        ampm = 'AM'
    }
    const finalTimeString = `${addOnParts[0]} ${addOnParts[1]} ${addOnParts[2]} ${addOnParts[3]} ${hours}:${minutes} ${ampm}`
    return finalTimeString
}

function UserProfile() {
  const user = useSelector((state) => state.session.user);
  const { setModalContent } = useModal();
  const history = useHistory();

  if (!user) {
    history.push("/");
    setModalContent(<LoginFormModal />);
  }

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
    <div>
        <h1>Account Info</h1>
      <div>
        <h2>Your General Information</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Birthday: {user.birthday}</p>
        <p>First Name: {user.first_name}</p>
        <p>Last Name: {user.last_name}</p>
        <>{user.address && (
            <p>Address: {user.address}</p>
        )}</>
      </div>
      <div>
        <h2>Past Orders</h2>
        {user.orders.sort((a, b) => {
            let aDate = new Date (a.created_at)
            let bDate = new Date (b.created_at)
            return bDate - aDate
        }).map(order => (
            <div key={order.id}>
                <h3>{order.restaurant.name}</h3>
                <p>Order Total: ${order.price.toFixed(2)}</p>
                <p>Ordered at: {helperFunc(order.created_at.split('GMT')[0])}</p>
                <p>Delivery Address: {order.address}</p>
                <div>
                    {order.items.map((item) => (
                        <div key={item.id}>
                            <img src={item.preview_img}/>
                            <p>Item Count: {item.quantity}</p>
                        </div>
                    ))}
                </div>
                {order.notes && (
                    <p>Order Notes: {order.notes}</p>

                )}
            </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
