const RECEIVE_ITEM = "/items/RECEIVE_ITEM";
const UPDATE_ITEM = "/items/UPDATE_ITEM";
const REMOVE_ITEM = "/items/REMOVE_ITEM";


// Action Creators

export const receiveItem = (item) => ({
    type: RECEIVE_ITEM,
    item
})

export const updateItem = (item) => ({
    type: UPDATE_ITEM,
    item
})

export const removeItem = (id) => ({
    type: REMOVE_ITEM,
    id
})


// Thunks


export const fetchItemThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/items/${id}`)

    if (res.ok) {
        const item = await res.json()
        dispatch(receiveItem(item))
        return item
    } else {
        const errors = await res.json()
        return errors
    }
}

export const createAnItemThunk = (restrauntId, payload) => async (dispatch) => {
    const res = await fetch(`/api/restraunts/${restrauntId}/items/new`, {
        method: "POST",
        // headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const newItem = await res.json()
        dispatch(receiveItem(newItem))
        return newItem
    } else {
        const errors = await res.json()
        return errors
    }
}

export const deleteAnItemThunk = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/items/${itemId}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
    })

    if (res.ok) {
      dispatch(removeItem(itemId));
      return;
    } else {
      const errors = await res.json();
      return errors;
    }
}

export const updateAnItemThunk = (item, id) => async (dispatch) => {
        const res = await fetch(`/api/items/${id}`, {
          method: "POST",
        //   headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });

        if (res.ok) {
          const updatedItem = await res.json();
          dispatch(updateItem(updatedItem));
          return updatedItem;
        } else {
          const errors = await res.json();
          return errors;
        }
}

const itemReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ITEM:
            return { ...state, [action.item.id]: action.item }
        case UPDATE_ITEM:
            return { ...state, [action.item.id]: action.item };
        case REMOVE_ITEM:
            const newState = { ...state }
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export default itemReducer
