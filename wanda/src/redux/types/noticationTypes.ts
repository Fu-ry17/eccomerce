import { INotification } from "../../utils/TypeScript"

export const GET_USER_NOTIFICATIONS = 'GET_USER_NOTIFICATIONS'
export const READ_NOTIFY = 'READ_NOTIFY'
export const DELETE_NOTIFY = 'DELETE_NOTIFY'


export interface IGetUserNotifyTypes{
    type: typeof GET_USER_NOTIFICATIONS,
    payload: INotification[]
}

export interface IReadNotifyTypes{
    type: typeof READ_NOTIFY,
    payload: INotification
}

export interface IDeleteNotifyTypes{
    type: typeof DELETE_NOTIFY,
    payload: string
}

export type INotifyTypes = IGetUserNotifyTypes | IReadNotifyTypes | IDeleteNotifyTypes