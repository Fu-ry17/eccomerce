import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import categoryReducer from "./categoryReducer";
import shopReducer from "./shopReducer";
import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";
import categoryProductReducer from "./categoryProductReducer";
import openNotification from "./openNotification";
import userOrderReducer from "./userOrdersreducer";
import userNotificationReducer from "./userNotificationReducer";

const reducers = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    categories: categoryReducer,
    shop: shopReducer,
    cart: cartReducer,
    products: productsReducer,
    productCategory: categoryProductReducer,
    openNotify: openNotification,
    userOrders: userOrderReducer,
    userNotifications: userNotificationReducer
})

export default reducers