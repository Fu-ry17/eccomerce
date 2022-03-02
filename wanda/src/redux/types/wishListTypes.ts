import { IProducts } from "../../utils/TypeScript";

export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'

export interface IAddWishList{
    type: typeof ADD_TO_WISHLIST,
    payload: IProducts
}


export type IWishListTypes = IAddWishList