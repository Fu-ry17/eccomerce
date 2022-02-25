import { INotification } from "../../utils/TypeScript";
import { GET_USER_NOTIFICATIONS, IGetUserNotifyTypes } from "../types/noticationTypes";


const userNotificationReducer = (state: INotification[] =[], action: IGetUserNotifyTypes): INotification[] => {
    switch (action.type) {
        case GET_USER_NOTIFICATIONS:
           return action.payload
        default:
           return state
    }
}

export default userNotificationReducer