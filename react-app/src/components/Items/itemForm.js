import { useDispatch } from "react-redux";
import { useState } from "react";
import { createAnItemThunk, updateAnItemThunk } from "../../store/restaurant";
import { useModal } from "../../context/Modal";
import React from "react";
import "./Items.css";

const ItemForm = ({ item, formType, restaurantId }) => {
  const { closeModal } = useModal();
  const [name, setName] = useState(formType === "Update" ? item.name : "");
  const [description, setDescription] = useState(
    formType === "Update" ? item.description : ""
  );
  const [category, setCategory] = useState(
    formType === "Update" ? item.category : ""
  );
  const [preview_img, setPreview_img] = useState(
    formType === "Update" ? item.preview_img : null
  );

  const [localImg, setLocalImg] = useState(
    formType === "Update" ? item.preview_img : null
  );

  const [price, setPrice] = useState(formType === "Update" ? item.price : 0);
  const [is_alcohol, setIsAlcohol] = useState(
    formType === "Update" ? item.is_alcohol : false
  );

  const [imageLoading, setImageLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  item = {
    ...item,
    name,
    description,
    category,
    preview_img,
    price,
    is_alcohol,
  };

  function onFileChange(e) {
    setPreview_img(e.target.files[0]);
    setLocalImg(URL.createObjectURL(e.target.files[0]));
  }

  // Thunk Operations

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsObj = {};
    if (!name) errorsObj.name = "Name is required";
    if (description.length < 25 || description.length > 255)
      errorsObj.description =
        "Description must be at least 25 characters and less than 255 characters";
    if (!category) errorsObj.category = "Please select category";
    if (!preview_img) errorsObj.preview_img = "Image is required";
    if (!price) errorsObj.price = "Price is required";

    if (!Object.keys(errorsObj).length) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("preview_img", preview_img);
      formData.append("price", price);
      formData.append("is_alcohol", is_alcohol);
      if (formType == "Update")
        formData.append("restaurant_id", item.restaurant_id);
      setImageLoading(true);
      if (formType === "Update") {
        try {
          await dispatch(updateAnItemThunk(formData, item.id));
          closeModal();
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await dispatch(createAnItemThunk(restaurantId, formData));
          closeModal();
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      setErrors(errorsObj);
    }
  };

  return (
    <div className="create-an-item-div">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="create-an-item-form"
      >
        <label className="item-form-labels">
          Item Name
          <input
            className="item-input"
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {errors.name && <p className="item-errors">{errors.name}</p>}
        <label className="item-form-labels">
          Item Description
          <textarea
            id="item-description"
            rows="5"
            placeholder="Item Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {errors.description && (
          <p className="item-errors">{errors.description}</p>
        )}
        <label className="item-form-labels">
          Category:{"  "}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled hidden>
              Category
            </option>
            <option value="Starters">Starters</option>
            <option value="Entrees">Entrees</option>
            <option value="Side Dishes">Side Dishes</option>
            <option value="Salads">Salads</option>
            <option value="Soups">Soups</option>
            <option value="Sandwiches">Sandwiches</option>
            <option value="Desserts">Desserts</option>
            <option value="Beverages">Beverages</option>
            <option value="Specials">Specials</option>
          </select>
        </label>
        {errors.category && <p className="item-errors">{errors.category}</p>}
        <label className="item-form-labels">
          Set The Price
          <input
            className="item-input"
            type="number"
            step="0.01"
            placeholder="0"
            value={price}
            min="0.01"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </label>
        {errors.price && <p>{errors.price}</p>}
        {category == "Beverages" && (
          <label className="item-form-labels">
            Is Alcohol?
            <input
              type="checkbox"
              id="is-alcohol"
              checked={is_alcohol === true}
              onChange={() => setIsAlcohol(!is_alcohol)}
            />
          </label>
        )}
        {errors.is_alcohol && (
          <p className="item-errors">{errors.is_alcohol}</p>
        )}

        <label className="item-form-labels">
          Choose Your Food Image
          <input
            id="item-img-input"
            type="file"
            name="Item Image"
            accept=".jpg, .jpeg, .png"
            onChange={onFileChange}
          />
          {localImg && (
            <div id="item-img-container">
              <img src={localImg} alt="" />
            </div>
          )}
        </label>
        {errors.preview_img && (
          <p className="item-errors">{errors.preview_img}</p>
        )}
        <button className="item-submit-button">Submit</button>
        {imageLoading && <p>Image is Loading...</p>}
      </form>
    </div>
  );
};

export default ItemForm;
