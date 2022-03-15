import { IProducts } from "../../utils/TypeScript";
import { DELETE_PRODUCT, GET_PRODUCTS, IProductsTypes, UPDATE_PRODUCT } from "../types/productTypes";

const productsReducer = (state: IProducts[] = [], action: IProductsTypes): IProducts[] => {
   switch (action.type) {
       case GET_PRODUCTS:
           return action.payload
       case UPDATE_PRODUCT:
           return state.map(item => item._id === action.payload._id ? action.payload : item)
       case DELETE_PRODUCT:
           return state.filter(item => item._id !== action.payload)
       default:
           return state
   }
}

export default productsReducer