import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { fetchRestaurants, fetchRestaurant } from '../../store/restaurant';
import RestaurantTile from './restaurant-tile';

// import 'Restaurants.css'

function Restaurants(){
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(fetchRestaurants())
        // dispatch(fetchRestaurant())
    }, [dispatch])

    const restaurantsObj = useSelector( state => state.restaurants)
    const restaurants = Object.values(restaurantsObj)
    // console.log('IN /RESTAURANTS', restaurants)
    if (!restaurants) return null


    return (
        <div>
            {restaurantsData && restaurantsData.Restaurants.map((restaurant) => (
                <div key={restaurant.id}>
                    <p>{restaurant.name}</p>
                    <p>{restaurant.category}</p>
                    <p>{restaurant.address}</p>
                    <p>{restaurant.city}</p>
                    <p>{restaurant.state}</p>
                    <img src={restaurant.preview_img} alt={restaurant.name} />
                </div>
            ))}
        </div>
    );
};

export default GetRestaurants;
