



function RestaurantTile({ restaurant }) {
                let hours = new Date().getHours()
                let AMorPM = hours >= 12  && hours < 24? 'PM' : 'AM'
                // if(hours === 12 || hours === 0) hours = 12
                // else {
                //     hours = AMorPM === 'PM' ? hours - 12 : hours
                // }
                let minutes = new Date().getMinutes()
                if(minutes === 0 || minutes < 10) minutes = `0${minutes}`
                let currentTime = `${hours}:${minutes}`
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
