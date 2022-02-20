import { Dispatch } from "redux";
import { getAPI, patchAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { validPassword } from "../../utils/valid";
import { ALERT, IAlertTypes } from "../types/alertTypes";
import { AUTH, IAuth, IAuthTypes } from "../types/authTypes";
import { GET_USER_ORDERS, IGetUserOrdersTypes } from "../types/orderTypes";


export const updateUser = (name: string, avatar: File, auth: IAuth) => async(dispatch: Dispatch<IAlertTypes| IAuthTypes >) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})  
        
        let url
        if(avatar){
          let media = await imageUpload([avatar])
          if(!media) return
          url = media[0].url
        }

        const res = await patchAPI('user', { 
            name: name ? name : auth.user?.name,
            avatar: url ? url : auth.user?.avatar
        }, auth.accessToken)

        if(!auth.user) return

        dispatch({ type: AUTH, payload: {
            accessToken: auth.accessToken,
            user: {
                ...auth.user,
                avatar: url ? url : auth.user.avatar,
                name: name ? name : auth.user.name
            }
        }})
        
        dispatch({ type: ALERT, payload: { success: res.data.msg }})  

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})   
    }
}

export const updatePassword = (password: string, cf_password: string, token: string) => async(dispatch: Dispatch<IAlertTypes| IAuthTypes >) => {
    try {
       const check = validPassword(password, cf_password)
       if(check) return dispatch({ type: ALERT, payload: {error: check.msg }})

       dispatch({ type: ALERT, payload: { loading: true }})
       const res = await patchAPI('reset', {password}, token)
      
       dispatch({ type: ALERT, payload: { success: res.data.msg }})
       
    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})   
    }
}

export const getuserOrders = (id: string, token: string) => async(dispatch: Dispatch<IAlertTypes | IGetUserOrdersTypes>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})
        const res = await getAPI(`/user/orders/${id}`, token)

        dispatch({ type: GET_USER_ORDERS, payload: res.data })
        dispatch({ type: ALERT, payload: { }})
        

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})  
    }
}