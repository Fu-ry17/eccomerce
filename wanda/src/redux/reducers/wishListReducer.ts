import { IProducts } from "../../utils/TypeScript";
import { ADD_TO_WISHLIST, IWishListTypes } from "../types/wishListTypes";


const wishListReducer = (state: IProducts[] = [], action: IWishListTypes): IProducts[] => {
   switch (action.type) {
       case ADD_TO_WISHLIST:
         return [action.payload, ...state]
       default:
         return state
   }
}

export default wishListReducer