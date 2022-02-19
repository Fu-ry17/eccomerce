import { IUser } from "../../utils/TypeScript";

export const AUTH = 'AUTH'

export interface IAuth{
    msg?: string
    accessToken?: string
    user?: IUser
}


export interface IAuthTypes{
    type: typeof AUTH,
    payload: IAuth
}
