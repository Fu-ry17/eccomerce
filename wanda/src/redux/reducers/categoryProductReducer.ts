import { GET_PRODUCTS_BY_CATEGORY, IGetByCategory, IGetByCategoryTypes } from "../types/productTypes"


const categoryProductReducer = ( state: IGetByCategory[] = [], action: IGetByCategoryTypes): IGetByCategory[] => {
 switch (action.type) {
     case GET_PRODUCTS_BY_CATEGORY:
        if(state.every(item => item.id !== action.payload.id )) {
            return [...state, action.payload]
        }else{
          return state.map(product => product.id === action.payload.id ? action.payload : product )
        }
     default:
         return state
 }
}

export default categoryProductReducer