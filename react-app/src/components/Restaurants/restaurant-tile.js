



function RestaurantTile({ restaurant }) {
                let hours = new Date().getHours()
                let AMorPM = hours >= 12  && hours < 24? 'PM' : 'AM'
                let minutes = new Date().getMinutes()
                if(minutes === 0 || minutes < 10) minutes = `0${minutes}`
                let currentTime = `${hours}:${minutes}`

                // if (Number(restaurant.hours_close.slice(0,2)) > 12) {
                //     restaurant.hours_close.slice(0,2) = 
                // }
                
    return (
        <div>
            <p><span>{restaurant.name}</span> <span>({restaurant.address})</span></p>
            <p>{restaurant.reviews.length ? (restaurant.reviews.reduce((curr, prev) => curr + prev.stars, 0) / restaurant.reviews.length).toFixed(1) : 'New Restaurant!!!'}</p>
            <img src={restaurant.preview_img} alt={restaurant.name} />
            { currentTime < restaurant.hours_close ? <p> Open until {restaurant.hours_close}</p> : <p>closed</p>}
        </div>
    )
}


export default RestaurantTile;
