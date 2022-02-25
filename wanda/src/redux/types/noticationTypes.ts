import { INotification } from "../../utils/TypeScript"

export const GET_USER_NOTIFICATIONS = 'GET_USER_NOTIFICATIONS'


export interface IGetUserNotifyTypes{
    type: typeof GET_USER_NOTIFICATIONS,
    payload: INotification[]
}