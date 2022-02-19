import { Dispatch } from "redux"
import { getAPI, postAPI } from "../../utils/fetchData"
import { imageUpload } from "../../utils/imageUpload"
import { IProducts } from "../../utils/TypeScript"
import { ALERT, IAlertTypes } from "../types/alertTypes"
import { GET_PRODUCTS, IGetProductTypes, IGetShopProductTypes, SHOP } from "../types/productTypes"


export const getShopProducts = () => async(dispatch: Dispatch<IAlertTypes | IGetShopProductTypes>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await getAPI('products/shop')

        dispatch({ type: SHOP, payload: res.data.products })
        dispatch({ type: ALERT, payload: {} })

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg} }) 
    }
}

// admin only
export const getAllProducts = () => async(dispatch: Dispatch<IAlertTypes | IGetProductTypes>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await getAPI('admin/products')

        dispatch({ type: GET_PRODUCTS, payload: res.data.products})
        dispatch({ type: ALERT, payload: {} })
     
    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg} }) 
    }
}
// admin only
export const createProducts = (data: IProducts, images: File[], token: string) => async(dispatch: Dispatch<IAlertTypes>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        let media;

        if(images.length > 0){
          media = await imageUpload(images)
        }

        const res = await postAPI('products', { ...data, images: media }, token)
        
        dispatch({ type: ALERT, payload: { success: res.data.msg } })

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg} }) 
    }
}