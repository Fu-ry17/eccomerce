import { IProducts } from "../../utils/TypeScript";

export const SHOP = 'SHOP'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY'
export const LIKE_PRODUCT = 'LIKE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

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
   search: string
}

export interface IGetByCategoryTypes{
    type: typeof GET_PRODUCTS_BY_CATEGORY,
    payload: IGetByCategory
}

// shop
export interface IGetShopProductTypes{
    type: typeof SHOP,
    payload: IShop[]
}


// products
export interface IGetProductTypes{
    type: typeof GET_PRODUCTS,
    payload: IProducts[]
}

export interface IUpdateProductTypes{
   type: typeof UPDATE_PRODUCT,
   payload: IProducts
}


export type IShopTypes = IGetShopProductTypes 

export type IProductsTypes = IGetProductTypes | IUpdateProductTypes