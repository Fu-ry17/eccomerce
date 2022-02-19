import { IProducts } from "../../utils/TypeScript";
import { ADD_TO_CART, DELETE_CART, GET_CART, ICartTypes, UPDATE_CART } from "../types/cartTypes";

const cartReducer = ( state: IProducts[] = [], action: ICartTypes ): IProducts[] => {
     switch (action.type) {
         case GET_CART:
             return action.payload
         case ADD_TO_CART:
             return [ ...state, action.payload]
         case UPDATE_CART:
             return state.map(item => item._id === action.payload._id ? { ...item, qty: action.payload.qty } : item)
         case DELETE_CART:
             return state.filter(item => item._id !== action.payload)
         default:
             return state
     }
}

export default cartReducer