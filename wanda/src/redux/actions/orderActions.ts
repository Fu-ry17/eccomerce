import { token } from "morgan";
import { Dispatch } from "redux";
import { getAPI, patchAPI, postAPI } from "../../utils/fetchData";
import { IOrders , IProducts} from "../../utils/TypeScript";
import { validOrder } from "../../utils/valid";
import { ALERT, IAlertTypes } from "../types/alertTypes";
import { IAuth } from "../types/authTypes";
import { GET_ORDERS, IOrdersTypes, UPDATE_ORDER } from "../types/orderTypes";


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

export const getAllOrders = (token: string) => async(dispatch: Dispatch<IAlertTypes | IOrdersTypes>) => {
    try {
        const res = await getAPI(`orders`, token)

        dispatch({ type: GET_ORDERS, payoad: res.data.orders })
        
    } catch (error: any) {
        return dispatch({ type: ALERT, payload: { error: error.response.data.msg }})
    }
}

export const updateOrder = (token: string, data: IOrders) => async(dispatch: Dispatch<IAlertTypes | IOrdersTypes>) =>{
    try {
        dispatch({ type: ALERT, payload: { loading: true }})
        let new_item
        if(data.status === false){
            new_item = { ...data, paid: true , status: true}
        }else{
            new_item = { ...data, status: false }
        }

        const res = await patchAPI(`orders/delivered/${new_item._id}`, {...new_item}, token)

        dispatch({ type: UPDATE_ORDER, payload: res.data.new_order})

        console.log(res.data.new_order)

        dispatch({ type: ALERT, payload: { success: res.data.msg }})

    } catch (error: any) {
        return dispatch({ type: ALERT, payload: { error: error.response.data.msg }})
    }
}