import { useState } from "react";
import { useSelector } from "react-redux";
import { updateCartQty } from "../../store/cart";
import { useEffect } from "react";

function CartItem({item}) {
    const [Qty, setQty] = useState();
    
    const options = () => {
        const optionsArr = [];
        for (let i = 1; i < 101; i++) {
          optionsArr.push(i);
        }
        return optionsArr;
      };
    
    useEffect(() => {
        setQty(item.qty)
    }, [item])


    return (
    <div>
        <img src={item.preview_img}/>
        <div>{item.name}</div>
        <div>
            <select onChange={e => {
                updateCartQty(e.target.value)}}
            value={Qty} 
            >
            {options().map(option =>(
                <option value = {option}>{option}</option>
            ))}
            </select>
            <div>{item.price * Qty}</div>
        </div>
    </div>
    )
}

export default CartItem
