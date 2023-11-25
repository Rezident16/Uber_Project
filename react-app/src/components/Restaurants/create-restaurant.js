import RestaurantForm from "./restaurant-form";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import React, {useEffect} from 'react';

function CreateRestaurant(){
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (!sessionUser) {
            history.push('/restaurants');
        }
    }, [sessionUser, history]);

    if (!sessionUser) return null;
    
        return (
            <div className=''>
                <h3 className="form_type">Get Started</h3>
                <RestaurantForm formAction='create'/>
            </div>
        )
}

export default CreateRestaurant;
