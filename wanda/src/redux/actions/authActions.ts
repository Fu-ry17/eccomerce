import { Dispatch } from "redux"
import { getAPI, postAPI } from "../../utils/fetchData"
import { IUserLogin, IUserRegister } from "../../utils/TypeScript"
import { validRegister } from "../../utils/valid"
import { ALERT, IAlertTypes } from "../types/alertTypes"
import { AUTH, IAuthTypes } from "../types/authTypes"


export const login = (user: IUserLogin) => async(dispatch: Dispatch<IAlertTypes | IAuthTypes>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})
        const res = await postAPI('login', user)

        dispatch({ type: AUTH, payload: res.data })
        dispatch({ type: ALERT, payload: { success: res.data.msg } })

        localStorage.setItem("store-app", "true")

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})
        localStorage.removeItem("store-app")
    }
}

export const register = (user: IUserRegister) => async(dispatch: Dispatch<IAlertTypes | IAuthTypes>) => {
    const check = validRegister(user)
    if(check) return dispatch({ type: ALERT, payload: { error: check.msg }})

    try {
      dispatch({ type: ALERT, payload: { loading: true }})
      const res = await postAPI('register', user)

     dispatch({ type: ALERT, payload: { success: res.data.msg }})

    } catch (error: any) {
      dispatch({ type: ALERT, payload: { error: error.response.data.msg }})
    }
}

export const refreshToken = () => async(dispatch: Dispatch<IAlertTypes | IAuthTypes>) => {
    const check = localStorage.getItem('store-app')
    if(check !== 'true') return

    try {
        dispatch({ type: ALERT, payload: { loading: true }}) 
        const res = await getAPI('refreshToken')

        dispatch({ type: AUTH, payload: res.data })
        dispatch({ type: ALERT, payload: {} }) 
        
    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})
    }
}

export const logout = () => async(dispatch: Dispatch<IAlertTypes>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }}) 
        const res = await getAPI('logout')
        
        localStorage.removeItem('store-app')
        dispatch({ type: ALERT, payload: { success: res.data.msg }})
        window.location.href = '/'

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})
    }
}