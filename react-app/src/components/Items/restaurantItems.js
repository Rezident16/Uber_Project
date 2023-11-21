import OpenModalButton from "../OpenModalButton";
import ItemModal from "./itemModal";
import { useEffect, useState } from "react";
import "./Items.css";
import DeleteModal from "./deleteItemModal";
import { useSelector } from "react-redux";
import ItemForm from "./itemForm";
import ItemModalButton from "./itemModalButton";

function Items({ restaurant }) {
  const currUserObj = useSelector((state) => state.session);
  const userId = currUserObj.user ? currUserObj.user.id : false;
  const [isOwner, setIsOwner] = useState(false);

  console.log(restaurant);

  const items = Object.values(restaurant.items);

  useEffect(() => {
    if (restaurant.owner_id === userId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [restaurant, userId]);

  // console.log(items);
  console.log(
    "RESTAURANT OWNER ID:",
    restaurant.owner_id,
    typeof restaurant.owner_id
  );
  console.log("USER ID:", userId, typeof userId);
  return (
    <>
      {isOwner && (
        <>
          <OpenModalButton
            buttonText={"Add Menu Item"}
            className={"update_component"}
            modalComponent={
              <ItemForm formType={"Create"} restaurantId={restaurant.id} />
            }
          />
        </>
      )}
      {items &&
        items.map((item) => (
          <div key={item.id}>
            <ItemModalButton
              buttonText={
                <div>
                  <img src={item.preview_img} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                </div>
              }
              modalComponent={<ItemModal item={item} />}
            />
            {isOwner && (
              <div>
                <OpenModalButton
                  buttonText={"Delete Item"}
                  className="delete_item"
                  modalComponent={<DeleteModal id={item.id} />}
                />
                <OpenModalButton
                  buttonText={"Update Menu Item"}
                  className={"update_component"}
                  modalComponent={<ItemForm formType={"Update"} item={item} />}
                />
              </div>
            )}
          </div>
        ))}
    </>
  );
}

export default Items;
