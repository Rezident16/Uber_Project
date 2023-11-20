/*
Review:
The review will be submitted on the front end via fetch request and after that we force the restaurant info to be re-rendered
*/

/** Action Type Constants: */
export const LOAD_RESTAURANTS = 'restaurants/LOAD_RESTAURANTS'
export const UPDATE_RESTAURANT = '/restaurants/UPDATE_RESTAURANT'
export const RECEIVE_RESTAURANT = '/restaurants/RECEIVE_RESTAURANT'
// export const REMOVE_RESTAURANT = '/restaurants/REMOVE_RESTAURANT'

/**  Action Creators: */
export const loadRestaurants = (restaurants) => ({
    type: LOAD_RESTAURANTS,
    restaurants
})

export const receiveRestaurant = (restaurant) => ({
    type: RECEIVE_RESTAURANT,
    restaurant
})

export const updateRestaurant = (restaurant) => ({
    type: UPDATE_RESTAURANT,
    restaurant
})

// export const removeRestaurant = (id) => ({
//     type: REMOVE_RESTAURANT,
//     id
// })

/** Thunk Action Creators: */

// all restaurants
export const fetchRestaurants = () => async dispatch => {
    const response = await fetch ('/api/restaurants')
    const data = await response.json()
    dispatch (loadRestaurants(data))
}
// one restaurant
// export const fetchRestaurant = (id) => async dispatch => {
//     const response = await fetch (`/api/restaurants/${id}`)
//     const data = await response.json()
//     dispatch(receiveRestaurant(data));
// }

// create restaurant
export const fetchCreateNewRestaurant = (payload) => async dispatch => {
    const response = await fetch (`/api/restaurants`, {
        method: "POST",
        // headers: {'Content-Type': 'application/json'},
        body: payload
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(receiveRestaurant(data));
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}
// update restaurant
export const fetchUpdateRestaurant = (restaurantId, payload) => async dispatch => {
    const response = await fetch (`/api/restaurants/${restaurantId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(updateRestaurant(data))
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

// delete restaurant
// export const fetchDeleteRestaurant = (id) => async dispatch => {
//     const response = await fetch(`/api/restaurants/${id}`, {
//         method: "DELETE",
//         headers: {'Content-Type': 'application/json'},
//     })
//     if (response.ok) {
//         dispatch (removeRestaurant(id))
//     } else {
//         const errors = await response.json()
//         return errors
//     }
// }


// Reducer
const restaurantReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_RESTAURANTS:
            const restaurantState = {}
            action.restaurants.Restaurants.forEach((restaurant) => {
                restaurantState[restaurant.id] = restaurant
            })
            return restaurantState;
        // case RECEIVE_RESTAURANT:
        //     return {...state, [action.restaurant.id]: action.restaurant}
        case UPDATE_RESTAURANT:
            return {...state, [action.restaurant.id]: action.restaurant}
        // case REMOVE_RESTAURANT:
        //     const newState = {...state}
        //     delete newState[action.id]
        //     return newState
        default:
            return state;
    }
}

export default restaurantReducer
