import { GET_USER_ORDERS, IGetUserOrders, IGetUserOrdersTypes } from "../types/orderTypes"

const userOrderReducer = (state: IGetUserOrders[] = [], action: IGetUserOrdersTypes): IGetUserOrders[] => {
    switch (action.type) {
        case GET_USER_ORDERS:
         return action.payload 
        default:
          return state
    }
}

export default userOrderReducer