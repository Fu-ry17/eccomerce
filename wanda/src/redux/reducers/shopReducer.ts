import { IShop, IShopTypes, SHOP } from "../types/productTypes";


const shopReducer = ( state: IShop[] = [], action: IShopTypes): IShop[] =>{
    switch (action.type) {
        case SHOP:
           return action.payload
        default:
            return state
    }
}

export default shopReducer