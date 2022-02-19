import { IProducts } from "../../utils/TypeScript";
import { GET_PRODUCTS, IGetProductTypes } from "../types/productTypes";

const productsReducer = (state: IProducts[] = [], action: IGetProductTypes): IProducts[] => {
   switch (action.type) {
       case GET_PRODUCTS:
           return action.payload
       default:
           return state
   }
}

export default productsReducer