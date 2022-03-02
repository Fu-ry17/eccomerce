import { IProducts } from "../../utils/TypeScript";
import { GET_PRODUCTS, IProductsTypes } from "../types/productTypes";

const productsReducer = (state: IProducts[] = [], action: IProductsTypes): IProducts[] => {
   switch (action.type) {
       case GET_PRODUCTS:
           return action.payload
       default:
           return state
   }
}

export default productsReducer