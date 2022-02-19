
export const ALERT = 'ALERT'

export interface IAlert{
    success?: string
    error?: string
    loading?: boolean
}

export interface IAlertTypes{
    type: typeof ALERT,
    payload: IAlert
}