import { IProducts } from "../../utils/TypeScript";

export const SHOP = 'SHOP'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY'

export interface IShop{
    count: number
    name: string
    products: IProducts[]
    _id: string
}

export interface IGetByCategory{
   id: string
   products: IProducts[]
   total: number
}

export interface IGetShopProductTypes{
    type: typeof SHOP,
    payload: IShop[]
}

export interface IGetProductTypes{
    type: typeof GET_PRODUCTS,
    payload: IProducts[]
}

export interface IGetByCategoryTypes{
    type: typeof GET_PRODUCTS_BY_CATEGORY,
    payload: IGetByCategory
}