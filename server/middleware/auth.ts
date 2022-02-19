import { Request, Response, NextFunction } from "express"
import { IDecodeToken, IReqAuth } from "../config/interface"
import jwt from 'jsonwebtoken'
import Users from "../models/userModel"

export const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')
        if(!token) return res.status(400).json({ msg: 'invalid authorization'})
        
        const decode = <IDecodeToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)

        const user = await Users.findById(decode.id).select('-password')

        req.user = user

        next()

    } catch (error: any) {
        return res.status(500).json({ msg: error.message })
    }
}

export default auth