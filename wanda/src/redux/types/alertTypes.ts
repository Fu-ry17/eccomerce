
export const ALERT = 'ALERT'
export const OPEN_NOTIFY = 'OPEN_NOTIFY'

export interface IAlert{
    success?: string
    error?: string
    loading?: boolean
}

export interface IAlertTypes{
    type: typeof ALERT,
    payload: IAlert
}


export interface IOpenNotifyTypes{
    type: typeof OPEN_NOTIFY,
    payload: boolean
}