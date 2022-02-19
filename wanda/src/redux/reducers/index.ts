import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import categoryReducer from "./categoryReducer";
import shopReducer from "./shopReducer";
import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";

const reducers = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    categories: categoryReducer,
    shop: shopReducer,
    cart: cartReducer,
    products: productsReducer
})

export default reducers