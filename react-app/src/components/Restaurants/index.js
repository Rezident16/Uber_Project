import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { fetchRestaurants } from '../../store/restaurant';
import RestaurantTile from './restaurant-tile';

// import 'Restaurants.css'

function Restaurants(){
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(fetchRestaurants())
    }, [dispatch])

    // const restaurantsObj = useSelector( state => state.restaurants)
    const restaurants = Object.values(useSelector( state => state.restaurants))
    if (!restaurants) return null

    // restaurants.forEach( restaurant => {
    //     restaurant.averageReview = 
    // })
    return (

        <>
        <div>
            
        </div>
        <div>
            {restaurants && restaurants.map((restaurant) => (
               <RestaurantTile restaurant={restaurant} key={restaurant.id}/>
            ))}
        </div>
        </>
    );
}

export default Restaurants;