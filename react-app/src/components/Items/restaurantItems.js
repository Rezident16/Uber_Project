import OpenModalButton from "../OpenModalButton";
import ItemModal from "./itemModal";
import { useEffect, useState } from "react";
import "./Items.css";
import DeleteModal from "./deleteItemModal";
import { useSelector } from "react-redux";
import ItemForm from "./itemForm";
import ItemModalButton from "./itemModalButton";
import React from "react";

function Items({ restaurant }) {
  const currUserObj = useSelector((state) => state.session);
  const userId = currUserObj.user ? currUserObj.user.id : false;
  const [isOwner, setIsOwner] = useState(false);

  // console.log(restaurant);

  const items = Object.values(restaurant.items);
  const categoryItems = {};
  items.forEach((item) => {
    if (categoryItems[item.category]) {
      categoryItems[item.category].push(item);
    } else {
      categoryItems[item.category] = [item];
    }
  });

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

  const categoryNav = Object.values(categoryItems).length ? 'category-nav' : 'category-nav-empty'

  console.log("USER ID:", userId, typeof userId);
  // console.log("USER ID:", userId, typeof userId);
  return (
    <div id="restaurant-items-container">
      <div id={categoryNav}>
        {items &&
          Object.values(categoryItems).map((category) => (
            <a href={`#${category[0].category}`}>{category[0].category}</a>
          ))}
        {isOwner && (
          <div className="add-item-button">
            <OpenModalButton
              buttonText={"Add Menu Item"}
              className={"update_component"}
              modalComponent={
                <ItemForm formType={"Create"} restaurantId={restaurant.id} />
              }
            />
          </div>
        )}
      </div>

      <div id="items-container">
        {items &&
          Object.values(categoryItems).map((category) => (
            <>
              <div className="category-container" id={category[0].category}>
                <h2 className="category-title">{category[0].category}</h2>
                {category.map((item) => (
                  <div className="category-tile" key={item.id}>
                    <ItemModalButton
                      buttonText={
                        <div>
                          <img src={item.preview_img} alt="" />
                          <p className="item-name">{item.name}</p>
                          <p className="item-price">${item.price}</p>
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
                          modalComponent={
                            <ItemForm formType={"Update"} item={item} />
                          }
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default Items;
