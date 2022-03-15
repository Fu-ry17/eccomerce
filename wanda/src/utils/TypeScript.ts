import { ChangeEvent } from 'react'
import reducers from '../redux/reducers'

export type InputChange = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement >

export type RootStore = ReturnType<typeof reducers>

export interface IUserLogin{
    account: string
    password: string
}

export interface IUserRegister extends IUserLogin{
    name: string
    cf_password: string
}

export interface IUser extends IUserLogin{
    avatar: string 
    createdAt: string
    name: string
    role: string
    root: boolean
    subscription: object[]
    updatedAt: string
    _id: string
    wishList: IProducts[]
}

export interface IUserProfile extends IUserRegister{
    avatar: string | File
}

export interface ICategory{
    createdAt: string
    name: string
    updatedAt: string
    _id: string
}

export interface Images{
    url: string,
    public_id: string
}

export interface IProducts{
    _id?: string
    title: string
    slug?: string
    description: string
    category?: ICategory | string
    price: number | string
    images: Images[] 
    quantityInStock: number | string
    qty?: number
    sold?: number,
    rating?: number,
    reviews?: number,
    createdAt?: string
    updatedAt?: string
    likes?: IUser[]
}

export interface IOrders{
    _id?: string
    cart?: IProducts[],
    user?: IUser
    phone?: string,
    location: string,
    notes: string,
    paymentMethod: string,
    paid?: boolean
    status?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface INotification{
    _id: string
    createdAt: string
    url_id: string
    icon: string
    message: string
    read: boolean
    updatedAt: string
    url: string,
    user: IUser
}