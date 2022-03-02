import { Dispatch } from "redux";
import { IProducts } from "../../utils/TypeScript";
import { ALERT, IAlertTypes } from "../types/alertTypes";
import { ADD_TO_WISHLIST, IWishListTypes } from "../types/wishListTypes";


export const addToWishList = (wishList: IProducts[], product: IProducts) => async(dispatch: Dispatch<IAlertTypes | IWishListTypes>) => {
   try { 
      const check = wishList.every(item => item._id !== product._id)  

      if(check){
          dispatch({ type: ADD_TO_WISHLIST, payload: product})
          dispatch({ type: ALERT, payload: { success: 'Added to wishList' }})
      }

   } catch (error: any) {
    dispatch({ type: ALERT, payload: { error: 'An error occured while adding to wishList'}})   
   }
}

