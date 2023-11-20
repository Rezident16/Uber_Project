
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import ItemModal from "./itemModal";
import { useState } from "react";
import "./Items.css";
import OpenModalItemButton from "./itemModalButton";
import DeleteModal from "./deleteItemModal";
import { useSelector } from "react-redux";
import ItemForm from "./itemForm";

function RestaurantItemsFunc({ restaurant }) {


  const currUserObj = useSelector((state) => state.session);
  const userId = currUserObj.user.id;
  console.log(items);
  return (
    <div className="create_item">
    {restaurant.ownerId == userId && (
        <OpenModalButton 
        buttonText={'Add Menu Item'}
        className={'update_component'}
        modalComponent={
            <ItemForm formType={'Create'}/>
        }     
        />
    )}
      {restaurant.items &&
        restaurant.items.map((item) => (
          <div>
            <OpenModalItemButton
              buttonText={
                <div>
                  <img src={item.preview_img} />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              }
              modalComponent={<ItemModal item={item} />}
            />
            {restaurant.ownerId == userId && (
                <div>
                    <OpenModalButton
                      buttonText={"Delete Item"}
                      className="delete_item"
                      modalComponent={<DeleteModal id={item.id} />}
                    />
                    <OpenModalButton
                    buttonText={"Update Menu Item"}
                    className={'update_component'}
                    modalComponent={<ItemForm formType={'Update'} item = {item}
                    />}
                    />
                </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default RestaurantItemsFunc;
