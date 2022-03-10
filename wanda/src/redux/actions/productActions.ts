import { Dispatch } from "redux"
import { getAPI, patchAPI, postAPI } from "../../utils/fetchData"
import { imageUpload } from "../../utils/imageUpload"
import { IProducts } from "../../utils/TypeScript"
import { ALERT, IAlertTypes } from "../types/alertTypes"
import { GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY, IGetByCategoryTypes, IGetProductTypes, IGetShopProductTypes, IProductsTypes, SHOP, UPDATE_PRODUCT } from "../types/productTypes"


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

export const getProductByCategory = (category: string) => async(dispatch: Dispatch<IAlertTypes | IGetByCategoryTypes>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await getAPI(`category/products/${category}`)

        dispatch({ type: GET_PRODUCTS_BY_CATEGORY, payload: { ...res.data, id: category }})
        dispatch({ type: ALERT, payload: { } })

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg} }) 
    }
}

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

export const updateProduct = (data: IProducts, images: any[], token: string) => async(dispatch: Dispatch<IAlertTypes | IProductsTypes>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})
        let newImgs = images.filter(item => !item.url)
        let oldImgs = images.filter(item => item.url)
        let media

        if(newImgs.length > 0){
           media = await imageUpload(newImgs)
        }

        const res = await patchAPI(`products/${data._id}`, { ...data, images: media ? [...oldImgs, ...media] : oldImgs }, token)
        
        dispatch({ type: UPDATE_PRODUCT, payload: res.data.updatedProduct })
        
        dispatch({ type: ALERT, payload: { success: res.data.msg }})

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})
    }
}

