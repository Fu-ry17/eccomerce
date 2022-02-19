import { AUTH, IAuth, IAuthTypes } from "../types/authTypes";


const authReducer = (state: IAuth = {}, action: IAuthTypes): IAuth => {
     switch (action.type) {
         case AUTH:
             return action.payload    
         default:
            return state
     }
}

export default authReducer