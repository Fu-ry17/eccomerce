import { Dispatch } from "redux";
import { deleteAPI, getAPI, patchAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { INotification } from "../../utils/TypeScript";
import { validPassword } from "../../utils/valid";
import { ALERT, IAlertTypes } from "../types/alertTypes";
import { AUTH, IAuth, IAuthTypes } from "../types/authTypes";
import { DELETE_NOTIFY, GET_USER_NOTIFICATIONS, IDeleteNotifyTypes, IGetUserNotifyTypes, IReadNotifyTypes, READ_NOTIFY } from "../types/noticationTypes";
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

export const getuserOrders = (id: string, token: string, search: string) => async(dispatch: Dispatch<IAlertTypes | IGetUserOrdersTypes>) => {
    try {
        let limit = 6;
        let value = search ? search : `?page=${1}`
        dispatch({ type: ALERT, payload: { loading: true }})
        const res = await getAPI(`/user/orders/${id}${value}&limit=${limit}`, token)

        dispatch({ type: GET_USER_ORDERS, payload: {...res.data, search} })
        dispatch({ type: ALERT, payload: { }})
        

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})  
    }
}

export const getNotifications = (id: string, token: string) => async(dispatch: Dispatch<IAlertTypes | IGetUserNotifyTypes>) => {
    try {   
        const res = await getAPI(`notification/user/${id}`, token)
        dispatch({ type: GET_USER_NOTIFICATIONS, payload: res.data.notification})
    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})  
    }
}

export const readNotify = (notify: INotification, token: string) => async(dispatch: Dispatch<IAlertTypes | IReadNotifyTypes>) => {
    try {
       
        let new_notify = { ...notify, read: true }
        dispatch({ type: READ_NOTIFY, payload: new_notify})

        await patchAPI(`notification/${notify._id}`, {...new_notify }, token)
        
    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})  
    }
}

export const deleteNotify = (id: string, token: string) => async(dispatch: Dispatch<IAlertTypes | IDeleteNotifyTypes>) => {
    try {
        dispatch({ type: DELETE_NOTIFY, payload: id})
        
        const res = await deleteAPI(`notification/${id}`, token)
        dispatch({ type: ALERT, payload: { success: res.data.msg }})

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})  
    }
}