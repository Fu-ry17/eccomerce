import { Dispatch } from "redux";
import { getAPI, postAPI } from "../../utils/fetchData";
import { IOrders, IProducts } from "../../utils/TypeScript";
import { validOrder } from "../../utils/valid";
import { ALERT, IAlertTypes } from "../types/alertTypes";
import { IAuth } from "../types/authTypes";


export const createOrder = (phone: string, data: IOrders, cart: IProducts[], auth: IAuth, amount: number) => async(dispatch: Dispatch<IAlertTypes>) => {
    try {
        const check = validOrder(phone, data, cart)
        if(check) return dispatch({ type: ALERT, payload: { error: check.msg }})

        dispatch({ type: ALERT, payload: { loading: true }})
      
       if(data.paymentMethod === 'On-Delivery'){   
           const res = await postAPI('create_order', { ...data, phone, cart}, auth.accessToken)
           localStorage.removeItem('cart')
           dispatch({ type: ALERT, payload: { success: res.data.msg }})
           setTimeout(()=> {
              window.location.href = '/'
           }, 1000) 
       }else if(data.paymentMethod === 'M-pesa'){
           const res = await postAPI('stk_push', { phone, amount }, auth.accessToken)
           dispatch({ type: ALERT, payload: { success: res.data.msg }})
         
            const response = await getAPI('m-pesa/response')
            console.log(response)
       }
        
    } catch (error: any) {
        return dispatch({ type: ALERT, payload: { error: error.response.data.msg }})
    }
}