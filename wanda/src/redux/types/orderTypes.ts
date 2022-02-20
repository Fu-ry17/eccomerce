import { IOrders } from "../../utils/TypeScript";

export const GET_USER_ORDERS = 'GET_USER_ORDERS'

export interface IGetUserOrders{
    orders: IOrders[]
    total: number
}

export interface IGetUserOrdersTypes{
    type: typeof GET_USER_ORDERS,
    payload: IGetUserOrders[]
}