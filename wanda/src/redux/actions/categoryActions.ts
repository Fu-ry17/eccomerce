import { Dispatch } from "redux";
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../utils/fetchData";
import { ICategory } from "../../utils/TypeScript";
import { ALERT, IAlertTypes } from "../types/alertTypes";
import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, ICreateCategory, IDeleteCategory, IGetCategory, IUpdateCategory, UPDATE_CATEGORY } from "../types/categoryTypes";

export const createCategory = (name: string, token: string) => async(dispatch: Dispatch<IAlertTypes | ICreateCategory>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})
        const res = await postAPI('category', {name}, token)

        dispatch({ type: CREATE_CATEGORY, payload: res.data.newCategory })

        dispatch({ type: ALERT, payload: { success: res.data.msg }})

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})
    }
}

export const getCategories = () => async(dispatch: Dispatch<IAlertTypes | IGetCategory>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})
        const res = await getAPI('category')

        dispatch({ type: GET_CATEGORY, payload: res.data.category })
        dispatch({ type: ALERT, payload: {} })

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})
    }
}

export const updateCategory = (data: ICategory, token: string) => async(dispatch: Dispatch<IAlertTypes | IUpdateCategory>) => {
  try {
        dispatch({ type: ALERT, payload: { loading: true }})
        const res = await patchAPI(`category/${data._id}`,{ name: data.name}, token)
         
        dispatch({ type: UPDATE_CATEGORY, payload: data })
        dispatch({ type: ALERT, payload: { success: res.data.msg }})
        
  } catch (error: any) {
    dispatch({ type: ALERT, payload: { error: error.response.data.msg }})
  }
}

export const deleteCategory = (id: string, token: string) => async(dispatch:Dispatch<IAlertTypes | IDeleteCategory>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})
        const res = await deleteAPI(`category/${id}`, token)
         
        dispatch({ type: DELETE_CATEGORY, payload: id })
        dispatch({ type: ALERT, payload: { success: res.data.msg }})

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})
    }
}