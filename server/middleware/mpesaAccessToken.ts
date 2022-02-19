import { Request, Response, NextFunction } from "express"
import axios from 'axios'
import { IReqAuth } from "../config/interface"

const mpesaAccessToken = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        const url = `${process.env.ACCESS_TOKEN_URL}`
        const auth = 'Basic ' + Buffer.from(`${process.env.CONSUMER_KEY}`+ ':' + `${process.env.CONSUMER_SECRET}`).toString('base64')

        axios.get(url, { headers: { Authorization: auth}})
             .then(response =>{
                req.access_token = response.data.access_token
                next()
             })
             .catch(error => {
                 return res.status(500).json({ msg: error.message })
             })

    } catch (error: any) {
        return res.status(500).json({ msg: error.message })
    }
}

export default mpesaAccessToken