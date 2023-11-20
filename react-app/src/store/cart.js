const LOAD_CART_COOKIE = 'cart/LOAD_CART_COOKIE'
const SET_CART_COOKIE = 'cart/SET_CART_COOKIE'
const ADD_TO_CART = 'cart/ADD_TO_CART'
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART'
const UPDATE_CART_ITEM_QTY = 'cart/UPDATE_CART_ITEM_QTY'
const CHECKOUT_CART = 'cart/CHECKOUT_CART'

// Action Creators
export const loadCart = () => ({
    type: LOAD_CART_COOKIE,
})

// export const setCartCookie = (cart) => ({
//     type: SET_CART_COOKIE,
//     cart
// })

export const addToCart = (item, qty = 1) => ({
    type: ADD_TO_CART,
    item,
    qty
})

export const removeFromCart = (item) => ({
    type: REMOVE_FROM_CART,
    item
})

export const updateCartQty = (item, qty) => ({
    type: UPDATE_CART_ITEM_QTY,
    item,
    qty
})

export const clearCart = () => ({   //Empty Cart
    type: CHECKOUT_CART
})

// Thunk Action Creators
export const submitOrder = (body, id) => async dispatch => {
    const response = await fetch (`/api/restaurants/${id}/orders`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
        }
    )
    if (response.ok) {
        const data = await response.json()
        dispatch(clearCart)
        return data       
    } else {
        const errors = await response.json()
        return errors
    }
}

const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CART_COOKIE:
            let cart = localStorage.getItem('cart');
            return cart ? JSON.parse(cart) : {};
        case ADD_TO_CART:
            locatlStorage.setItem('cart', JSON.stringify({...state, [action.item.id]: {...action.item, qty: action.qty}}))
            return {...state, [action.item.id]: {...action.item, qty: action.qty}}
        case REMOVE_FROM_CART:
            const newState = {...state}
            delete newState[action.item.id]
            localStorage.setItem('cart', JSON.stringify(newState))
            return newState
        case UPDATE_CART_ITEM_QTY:
            localStorage.setItem('cart', JSON.stringify({...state, [action.item.id]: {...action.item, qty: action.qty}}))
            return {...state, [action.item.id]: {...action.item, qty: action.qty}}
        case CHECKOUT_CART:
            localStorage.removeItem('cart')
            return {}
    }
}
export default cartReducer
