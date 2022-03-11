import { IOrders } from "../../utils/TypeScript";

export const GET_USER_ORDERS = 'GET_USER_ORDERS'

export const GET_ORDERS = 'GET_ORDERS'
export const UPDATE_ORDER = 'UPDATE_ORDER'

export interface IGetUserOrders{
    orders?: IOrders[]
    total?: number,
    search?: string
}

export interface IGetUserOrdersTypes{
    type: typeof GET_USER_ORDERS,
    payload: IGetUserOrders
}

export interface IGetOrders{
    type: typeof GET_ORDERS,
    payoad: IOrders[]
}

export interface IUpdateOrders{
    type: typeof UPDATE_ORDER,
    payload: IOrders
}

export type IOrdersTypes = IGetOrders | IUpdateOrders