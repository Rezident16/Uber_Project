



function RestaurantTile({ restaurant }) {
    return (
        <div>
            <p><span>{restaurant.name}</span> <span>({restaurant.address})</span></p>
            <p>{(restaurant.reviews.reduce((curr, prev) => curr + prev.stars, 0) / restaurant.reviews.length).toFixed(1)}</p>
            <img src={restaurant.preview_img} alt={restaurant.name} />
        </div>
    )
}


export default RestaurantTile;