import { Dispatch } from "redux";
import { getAPI, postAPI } from "../../utils/fetchData";
import { IOrders, IProducts } from "../../utils/TypeScript";
import { validOrder } from "../../utils/valid";
import { ALERT, IAlertTypes } from "../types/alertTypes";
import { IAuth } from "../types/authTypes";


export const createOrder = (phone: string, data: IOrders, cart: IProducts[], auth: IAuth, amount: number, token?: string) => async(dispatch: Dispatch<IAlertTypes>) => {
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
           const checkOutId = res.data.checkOutId
           
           const response = await postAPI(`mpesaResponse/${checkOutId}`)
           dispatch({ type: ALERT, payload: { success: response.data.msg }})

            // create order
           const resp = await postAPI('create_order', { ...data, phone, cart}, auth.accessToken)
           localStorage.removeItem('cart')
           dispatch({ type: ALERT, payload: { success: resp.data.msg }})
           setTimeout(()=> {
              window.location.href = '/'
           }, 1000) 

       }else if(data.paymentMethod === 'CreditCard'){
           console.log(token, amount )
           const res = await postAPI('/stripe', { ...data, phone, cart, tokenId: token, amount }, auth.accessToken)
           dispatch({ type: ALERT, payload: { success: res.data.msg }})
           localStorage.removeItem('cart')
           setTimeout(()=> {
              window.location.href = '/'
           }, 1000) 
       }
        
    } catch (error: any) {
        return dispatch({ type: ALERT, payload: { error: error.response.data.msg }})
    }
}