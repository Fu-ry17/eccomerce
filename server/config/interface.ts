import { Document } from 'mongoose'
import { Request } from 'express'

export interface IUser extends Document{
    name: string
    account: string
    password: string
    avatar: string
    role: string,
    root: false,
    subscription: [],
    _id: string
    createdAt: string
    updatedAt: string
    _doc: object
}

export interface IProducts extends Document{
    _id: string
    title: string
    slug?: string
    description: string
    category?: string
    price: number | string
    images: []
    quantityInStock: number
    qty: number
    sold: number,
    rating?: number,
    reviews?: number,
    createdAt?: string
    updatedAt?: string
}

export interface IOrders{
    cart?: IProducts[],
    phone?: string,
    location: string,
    notes: string,
    paymentMethod: string
}

export interface INewUser{
    name: string
    account: string
    password: string
}

export interface IDecodeToken{
    id?: string
    newUser?: INewUser
    iat: number
    exp: number
}

export interface IReqAuth extends Request{
    user?: IUser
    access_token?: string
}