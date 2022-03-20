import { INotification } from "../../utils/TypeScript";
import { DELETE_NOTIFY, GET_USER_NOTIFICATIONS, IGetUserNotifyTypes, INotifyTypes, READ_NOTIFY } from "../types/noticationTypes";


const userNotificationReducer = (state: INotification[] = [], action: INotifyTypes): INotification[] => {
    switch (action.type) {
        case GET_USER_NOTIFICATIONS:
           return action.payload
        case READ_NOTIFY:
            return state.map(item => item._id === action.payload._id ? action.payload : item)
        case DELETE_NOTIFY:
            return state.filter(item => item._id !== action.payload)
        default:
           return state
    }
}

export default userNotificationReducer