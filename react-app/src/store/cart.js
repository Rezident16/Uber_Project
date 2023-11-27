const LOAD_CART_COOKIE = "cart/LOAD_CART_COOKIE";
const ADD_TO_CART = "cart/ADD_TO_CART";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";
const UPDATE_CART_ITEM_QTY = "cart/UPDATE_CART_ITEM_QTY";
const CHECKOUT_CART = "cart/CHECKOUT_CART";
const REMOVE_RESTAURANT_ITEMS_FROM_CART =
  "cart/REMOVE_RESTAURANT_ITEMS_FROM_CART";

// Action Creators
export const loadCart = () => ({
  type: LOAD_CART_COOKIE,
});

export const addToCart = (item, qty = 1) => ({
  type: ADD_TO_CART,
  item,
  qty,
});

export const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  item,
});

export const updateCartQty = (item, qty) => ({
  type: UPDATE_CART_ITEM_QTY,
  item,
  qty,
});

export const clearCart = () => ({
  //Empty Cart
  type: CHECKOUT_CART,
});

export const removeRestaurantItemsFromCart = (restaurantId) => ({
  type: REMOVE_RESTAURANT_ITEMS_FROM_CART,
  restaurantId,
});

// Thunk Action Creators
export const submitOrder = (body, id) => async (dispatch) => {
  const response = await fetch(`/api/restaurants/${id}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(clearCart);
    return data;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const loadCartThunk = () => async (dispatch) => {
  let cart = localStorage.getItem("cart");
  let items = {};
  const objectItems = Object.values(JSON.parse(cart));
  for (const key in objectItems) {
    const item = objectItems[key];
    const res = await fetch(`/api/items/${item.id}`);
    if (res.ok) {
      items[item.id] = item;
    }
  }
  localStorage.setItem("cart", JSON.stringify(items));
  dispatch(loadCart());
};

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CART_COOKIE:
      let cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : {};
    case ADD_TO_CART:
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state,
          [action.item.id]: { ...action.item, qty: parseInt(action.qty) },
        })
      );
      return {
        ...state,
        [action.item.id]: { ...action.item, qty: parseInt(action.qty) },
      };
    case REMOVE_FROM_CART:
      const newState = { ...state };
      delete newState[action.item.id];
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    case UPDATE_CART_ITEM_QTY:
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state,
          [action.item.id]: { ...action.item, qty: parseInt(action.qty) },
        })
      );
      return {
        ...state,
        [action.item.id]: { ...action.item, qty: parseInt(action.qty) },
      };
    case CHECKOUT_CART:
      localStorage.removeItem("cart");
      return {};
    case REMOVE_RESTAURANT_ITEMS_FROM_CART:
      const newCartState = { ...state };
      for (const key in newCartState) {
        if (newCartState[key].restaurant.id === action.restaurantId) {
          delete newCartState[key];
        }
      }
      localStorage.setItem("cart", JSON.stringify(newCartState));
      return newCartState;
    default:
      return state;
  }
};
export default cartReducer;
