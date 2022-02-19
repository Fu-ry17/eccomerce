import { ICategory } from "../../utils/TypeScript";
import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, ICategoryTypes, UPDATE_CATEGORY } from "../types/categoryTypes";

const categoryReducer = ( state: ICategory[] = [], action: ICategoryTypes): ICategory[] => {
    switch (action.type) {
        case GET_CATEGORY:
            return action.payload
        case CREATE_CATEGORY:
            return [ action.payload, ...state]
        case UPDATE_CATEGORY:
            return state.map(item => item._id === action.payload._id ? action.payload : item)
        case DELETE_CATEGORY:
            return state.filter(item => item._id !== action.payload)
        default:
            return state
    }
}

export default categoryReducer