import { IProducts } from "../../utils/TypeScript";
import { GET_PRODUCTS, IProductsTypes, LIKE_PRODUCT } from "../types/productTypes";

const productsReducer = (state: IProducts[] = [], action: IProductsTypes): IProducts[] => {
   switch (action.type) {
       case GET_PRODUCTS:
           return action.payload
       case LIKE_PRODUCT:
           return state.map(item => item._id === action.payload._id ? action.payload : item)
       default:
           return state
   }
}

export default productsReducer