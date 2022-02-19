import { IGetShopProductTypes, IShop, SHOP } from "../types/productTypes";


const shopReducer = ( state: IShop[] = [], action: IGetShopProductTypes): IShop[] =>{
    switch (action.type) {
        case SHOP:
           return action.payload
        default:
            return state
    }
}

export default shopReducer