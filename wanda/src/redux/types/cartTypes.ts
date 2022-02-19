import { IProducts } from "../../utils/TypeScript";

export const ADD_TO_CART = 'ADD_TO_CART'
export const GET_CART = 'GET_CART'
export const UPDATE_CART = 'UPDATE_CART'
export const DELETE_CART = 'DELETE_CART'

export interface IAddToCart{
    type: typeof ADD_TO_CART,
    payload: IProducts
}

export interface IGetCart{
    type: typeof GET_CART,
    payload: IProducts[]
}

export interface IUpdateCart{
    type: typeof UPDATE_CART,
    payload: IProducts
}

export interface IDeleteCart{
    type: typeof DELETE_CART,
    payload: string
}

export type ICartTypes = IAddToCart | IGetCart | IUpdateCart | IDeleteCart