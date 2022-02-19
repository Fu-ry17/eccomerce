import { Dispatch } from "react";
import { IProducts } from "../../utils/TypeScript";
import { ALERT, IAlertTypes } from "../types/alertTypes";
import { ADD_TO_CART, ICartTypes, UPDATE_CART } from "../types/cartTypes";


export const addToCart = (data: IProducts, cart: IProducts[]) => async(dispatch: Dispatch<IAlertTypes | ICartTypes>) =>{
    try {   
        const check = cart.every(item => item._id !== data._id)

        if(check){
           dispatch({ type: ADD_TO_CART, payload: { ...data, qty: 1 }})
           dispatch({ type: ALERT, payload: { success: 'Added to cart'}})
    
        }else{
           cart.forEach(item => {
               if(item._id === data._id){
                   let new_qty = (item.qty as number) >= item.quantityInStock ? (item.quantityInStock as number) : (item.qty as number) += 1
                   let new_item = { ...item, qty: new_qty}
                   dispatch({ type: UPDATE_CART, payload: new_item})
               }
           })
        } 
    } catch (error: any) {
         dispatch({ type: ALERT, payload: { error: 'An error occured while adding to cart '}})   
    }
}

