import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { fetchRestaurants } from '../../store/restaurants';
import RestaurantTile from './restaurant-tile';

// import 'Restaurants.css'

function Restaurants(){
    const dispatch = useDispatch()
    const restaurantsObj = useSelector(state => state.restaurants)
    const restaurants = Object.values(restaurantsObj)

    useEffect( () => {
        dispatch(fetchRestaurants())
        // dispatch(fetchRestaurant())
    }, [dispatch])

    console.log('IN /RESTAURANTS', restaurants)
    if (!restaurants) return null


    return (
        <div>
            {restaurants && restaurants.map((restaurant) => (
                <div key={restaurant.id}>
                    <RestaurantTile restaurant={restaurant}/>
                </div>
            ))}
        </div>
    );
};

export default Restaurants;
