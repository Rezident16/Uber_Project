const RECEIVE_ITEM = "/items/RECEIVE_ITEM";
const UPDATE_ITEM = "/items/UPDATE_ITEM";
const REMOVE_ITEM = "/items/REMOVE_ITEM";
const RECEIVE_RESTAURANT = "/restaurants/RECEIVE_RESTAURANT";
const REMOVE_RESTAURANT = "/restaurants/REMOVE_RESTAURANT";
const CREATE_REVIEW = "/reviews/CREATE_REVIEW";
const DELETE_REVIEW = "/reviews/DELETE_REVIEW";

// Action Creators

export const receiveItem = (item) => ({
  type: RECEIVE_ITEM,
  item,
});

export const updateItem = (item) => ({
  type: UPDATE_ITEM,
  item,
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  id,
});

export const receiveRestaurant = (restaurant) => ({
  type: RECEIVE_RESTAURANT,
  restaurant,
});

export const removeRestaurant = (id) => ({
  type: REMOVE_RESTAURANT,
  id,
});

const createAReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

const deleteAReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

// Thunks

// export const fetchItemThunk = (id) => async (dispatch) => {
//     const res = await fetch(`/api/items/${id}`)

//     if (res.ok) {
//         const item = await res.json()
//         dispatch(receiveItem(item))
//         return item
//     } else {
//         const errors = await res.json()
//         return errors
//     }
// }

export const fetchRestaurant = (id) => async (dispatch) => {
  const response = await fetch(`/api/restaurants/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveRestaurant(data));
    return data;
  } else {
    // const errors = await response.json();
    // return errors;
    return response;
  }
};

// export const fetchDeleteRestaurant = (id) => async (dispatch) => {
//   const response = await fetch(`/api/restaurants/${id}`, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//   });
//   if (response.ok) {
//     dispatch(removeRestaurant(id));
//   } else {
//     const errors = await response.json();
//     return errors;
//   }
// };
export const createAReviewThunk =
  (restaurantId, review) => async (dispatch) => {
    const res = await fetch(`/api/restaurants/${restaurantId}/reviews`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(review),
    });

    if (res.ok) {
      const rev = await res.json();
      dispatch(createAReview(rev));
      return rev;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const deleteAReviewThunk = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    dispatch(deleteAReview(reviewId));
    return;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const createAnItemThunk =
  (restaurantId, payload) => async (dispatch) => {
    const res = await fetch(`/api/restaurants/${restaurantId}/items/new`, {
      method: "POST",
      body: payload,
    });

    if (res.ok) {
      const newItem = await res.json();
      dispatch(receiveItem(newItem));
      return newItem;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const deleteAnItemThunk = (itemId) => async (dispatch) => {
  const res = await fetch(`/api/items/${itemId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    dispatch(removeItem(itemId));
    return;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const updateAnItemThunk = (item, id) => async (dispatch) => {
  const res = await fetch(`/api/items/${id}`, {
    method: "POST",
    body: item,
  });

  if (res.ok) {
    const updatedItem = await res.json();
    dispatch(updateItem(updatedItem));
    return updatedItem;
  } else {
    const errors = await res.json();
    return errors;
  }
};

const restaurantReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.item.id]: action.item,
        },
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.item.id]: action.item,
        },
      };
    case REMOVE_ITEM:
      const newState = { ...state };
      delete newState.items[action.id];
      return newState;
    case RECEIVE_RESTAURANT:
      const normalItems = {};
      action.restaurant.items.forEach((item) => (normalItems[item.id] = item));
      return { ...action.restaurant, items: normalItems };
    case REMOVE_RESTAURANT:
      return {};
    case CREATE_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.review],
      };
    case DELETE_REVIEW:
      const reviewRemoved = {
        ...state,
        reviews: state.reviews.filter(
          (review) => review.id !== action.reviewId
        ),
      };
      return reviewRemoved;
    default:
      return state;
  }
};

export default restaurantReducer;
