import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  fetchCreateNewRestaurant,
  fetchUpdateRestaurant,
} from "../../store/restaurants";
import { useState } from "react";
import React from "react";
import "./restaurantForm.css";

function RestaurantForm({ formAction, restaurant }) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const randIntMin = Math.floor(Math.random() * 4) * 5 + 10;
  const randIntMax = Math.floor(Math.random() * 3) * 5 + 10 + randIntMin;

  const [name, setName] = useState(
    formAction === "edit" ? restaurant.name : ""
  );
  const [category, setCategory] = useState(
    formAction === "edit" ? restaurant.category : ""
  );
  const [address, setAddress] = useState(
    formAction === "edit" ? restaurant.address : ""
  );
  const [city, setCity] = useState(
    formAction === "edit" ? restaurant.city : ""
  );
  const [state, setState] = useState(
    formAction === "edit" ? restaurant.state : ""
  );
  const [hoursOpen, setHoursOpen] = useState(
    formAction === "edit" ? restaurant.hours_open : ""
  );
  const [hoursClose, setHoursClose] = useState(
    formAction === "edit" ? restaurant.hours_close : ""
  );
  const [previewImg, setPreviewImg] = useState(
    formAction === "edit" ? restaurant.preview_img : null
  );
  const [imageLoading, setImageLoading] = useState(false);

  const minOrderTime =
    formAction === "edit" ? restaurant.min_order_time : randIntMin;
  const maxOrderTime =
    formAction === "edit" ? restaurant.max_order_time : randIntMax;
  const [errors, setErrors] = useState({});
  const [errorsOnSubmit, setErrorsOnSubmit] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();

    let errorsObj = {};
    if (name.length < 2 || name.length > 50) {
      errorsObj.name = "Name must be 50 characters or less";
    }
    if (!name.length) {
      errorsObj.name = "Name is required";
    }
    if (!category.length) {
      errorsObj.about = "Category is required";
    }
    if (!address.length) {
      errorsObj.about = "Address is required";
    }
    if (address.length > 255) {
      errorsObj.about = "Address is invalid";
    }
    if (!city.length || !state) {
      errorsObj.location = "Location is required";
    }
    if (!hoursClose.length) {
      errorsObj.location = "Closing hours are required";
    }

    setErrors(errorsObj);

    const formdata = new FormData();
    formdata.append("owner_id", user.id);
    formdata.append("name", name);
    formdata.append("category", category);
    formdata.append("address", address);
    formdata.append("city", city);
    formdata.append("state", state);
    formdata.append("hours_open", hoursOpen);
    formdata.append("hours_close", hoursClose);
    formdata.append("preview_img", previewImg);
    formdata.append("min_order_time", minOrderTime);
    formdata.append("max_order_time", maxOrderTime);

    // Check for errors
    if (Object.keys(errorsObj).length > 0) {
      setErrorsOnSubmit({ ...errorsObj });
    } else {
      setErrorsOnSubmit({});
    }
    if (!Object.values(errorsObj).length) {
      setImageLoading(true);
      if (formAction === "edit") {
        try {
          await dispatch(fetchUpdateRestaurant(restaurant.id, formdata));
          history.push(`/restaurants`);
        } catch (e) {
          const errors = await e.json();
          setErrors(errors.errors);
        }
      } else {
        try {
          await dispatch(fetchCreateNewRestaurant(formdata));
          history.push(`/restaurants`);
        } catch (e) {
          const errors = await e.json();
          setErrors(errors.errors);
        }
      }
    }
  };

  const selectedState = state
    ? "restaurant_input select"
    : "restaurant_input_not_selected";

  const selectedCuisine = category
    ? "restaurant_input select"
    : "restaurant_input_not_selected";
  return (
    <form
      className="restaurant_form_container"
      onSubmit={onSubmit}
      encType="multipart/form-data"
    >
      <label className="form_element">
        <h3 className="form_text_restaurant">Restaurant Name</h3>
        <input
          type="text"
          className="restaurant_input"
          placeholder="Restaurant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      {errorsOnSubmit?.name && (
        <p className="restaurant-form-errors">{errorsOnSubmit.name}</p>
      )}
      {/* <div className="restaurant_separator"></div> */}
      <label className="form_element">
        <h3 className="form_text_restaurant">Cuisine</h3>
        <select
          type="text"
          value={category}
          className={selectedCuisine}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          placeholder="Category"
          required
        >
          <option value="" disabled hidden>
            Cuisine
          </option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Italian">Italian</option>
          <option value="American">American</option>
          <option value="Japanese">Japanese</option>
          <option value="Mexican">Mexican</option>
          <option value="Thai">Thai</option>
        </select>
      </label>
      {errorsOnSubmit?.category && (
        <p className="restaurant-form-errors">{errorsOnSubmit.category}</p>
      )}
      <div className="restaurant_separator"></div>
      <label className="form_element">
        <h3 className="form_text_restaurant">Address</h3>
        <input
          type="text"
          className="restaurant_input"
          placeholder="What is your restaurant address?"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      {errorsOnSubmit?.address && (
        <p className="restaurant-form-errors">{errorsOnSubmit.address}</p>
      )}

      <label className="form_element">
        <h3 className="form_text_restaurant">City</h3>
        <input
          type="text"
          className="restaurant_input"
          placeholder="What is your restaurant's city?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      {errorsOnSubmit?.location && (
        <p className="group-form-errors">{errorsOnSubmit.location}</p>
      )}

      <label className="form_element">
        <h3 className="form_text_restaurant">State</h3>
        <select
          type="text"
          value={state}
          className={selectedState}
          onChange={(e) => {
            setState(e.target.value);
            if (!e.target.value) errors.state = "State is required";
            else {
              errors.state = null;
            }
          }}
          required
          placeholder="State"
        >
          <option value="" disabled hidden>
            State
          </option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
      </label>
      <div className="restaurant_separator"></div>
      <div className="form_element">
        <h3 className="form_text_restaurant">Operating Hours</h3>
        <label>
          Hours Open
          <input
            type="time"
            className="restaurant_input"
            placeholder="What is your restaurant's opening time?"
            value={hoursOpen}
            onChange={(e) => setHoursOpen(e.target.value)}
            required
          />
        </label>
        <label>
          Hours Close
          <input
            type="time"
            className="restaurant_input"
            placeholder="What is your restaurant's closing time?"
            value={hoursClose}
            onChange={(e) => setHoursClose(e.target.value)}
            required
          />
        </label>
      </div>
      {errorsOnSubmit?.hoursOpen && (
        <p className="group-form-errors">{errorsOnSubmit.hoursOpen}</p>
      )}
      {errorsOnSubmit?.hoursClose && (
        <p className="group-form-errors">{errorsOnSubmit.hoursClose}</p>
      )}
      {formAction !== "edit" && (
        <label className="form_element">
          <div className="restaurant_separator"></div>
          <p>Please add an image url for your restaurant below:</p>
          {errorsOnSubmit?.previewImg && (
            <p className="group-form-errors">{errorsOnSubmit.previewImg}</p>
          )}
          <input
            type="file"
            placeholder="Restaurant Image File"
            accept=".jpg, .jpeg, .png"
            className="form_element button"
            onChange={(e) => setPreviewImg(e.target.files[0])}
            required
          />
        </label>
      )}

      {imageLoading && <p>Image is Loading...</p>}
      {/* <div className="restaurant_separator"></div> */}
      <div className="restaurant_button_div">
        <button type="submit">
          {formAction !== "edit" ? "Create Restaurant" : "Update Restaurant"}
        </button>
      </div>
    </form>
  );
}

export default RestaurantForm;
