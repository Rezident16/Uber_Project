import RestaurantForm from "./restaurant-form";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function CreateRestaurant(){
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) {
        return history.push('/restaurants')
      }
        return (
            <div className=''>
                <h3>Get Started</h3>
                <h2>fill out form bitch</h2>
                <RestaurantForm formAction='create'/>
            </div>
        )
}

export default CreateRestaurant;