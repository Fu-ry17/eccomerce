import { IOrders } from "../../utils/TypeScript"
import { GET_ORDERS, IOrdersTypes, UPDATE_ORDER } from "../types/orderTypes"

const ordersReducer = (state: IOrders[] = [], action: IOrdersTypes ): IOrders[] => {
   switch (action.type) {
       case GET_ORDERS:
           return action.payoad
       case UPDATE_ORDER:
           return state.map(item => item._id === action.payload._id ? action.payload : item)
       default:
          return state
   }
} 

export default ordersReducer