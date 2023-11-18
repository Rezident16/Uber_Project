import React, { useState, useEffect } from 'react';

const GetRestaurants = () => {
    const [restaurantsData, setRestaurantsData] = useState(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const res = await fetch('/api/restaurants');
                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    setRestaurantsData(data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchRestaurants();
    }, []);

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
