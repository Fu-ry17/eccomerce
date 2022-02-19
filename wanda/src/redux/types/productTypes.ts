import { IProducts } from "../../utils/TypeScript";

export const SHOP = 'SHOP'
export const GET_PRODUCTS = 'GET_PRODUCTS'

export interface IShop{
    count: number
    name: string
    products: IProducts[]
    _id: string
}

export interface IGetShopProductTypes{
    type: typeof SHOP,
    payload: IShop[]
}

export interface IGetProductTypes{
    type: typeof GET_PRODUCTS,
    payload: IProducts[]
}