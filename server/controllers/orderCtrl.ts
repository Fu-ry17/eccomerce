import  {Request, Response } from 'express'
import { generatePassword } from '../config/generateTokens'
import { IProducts, IReqAuth } from '../config/interface'
import { sendSms } from '../config/sendSms'
import Orders from '../models/ordersModel'
import axios from 'axios'
import Products from '../models/productModel'
const dt = require('node-datetime')


const orderCtrl = {
      createOrder: async(req: IReqAuth, res: Response) => {
          if(!req.user) return res.status(400).json({ msg: 'Invalid authorization'})
          try {
              
            const { location,paymentMethod,notes, phone, cart } = req.body

            const new_cart = <IProducts[]>cart

            let paid= false;

            if(paymentMethod === 'M-pesa'){
                paid = true
            }

            new_cart.filter(item => {
                updateProducts(item._id, item.qty, item.sold, item.quantityInStock)
            })

            const new_order = new Orders({
                location, paymentMethod, phone, paid, notes, cart, user: req.user._id
            })
               
           await new_order.save()

           sendSms(phone, req.user.name)

           return res.status(200).json({ msg: 'you have successfully placed an order'})

          } catch (error: any) {
             return res.status(500).json({ msg: error.message})
          }
      },
      //   m-pesa 
      stkPush: async(req: IReqAuth, res: Response) =>{
          if(!req.access_token) return res.status(400).json({ msg: 'Invalid authorization'})
          try {
              const { phone, amount } = req.body
              const formated = dt.create().format('YmdHMS')
              const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'

              let token = 'Bearer '+ req.access_token

              const password = generatePassword()

              const data = {
                "BusinessShortCode": `${process.env.SHORT_CODE}`,
                "Password": password,
                "Timestamp": formated,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": phone, // phone number
                "PartyB": `${process.env.SHORT_CODE}`,
                "PhoneNumber": phone, // phone number
                "CallBackURL": "https://fb11-41-81-151-238.ngrok.io/api/response",
                "AccountReference": "Fury Store",
                "TransactionDesc": "Lipa na m-pesa" 
              }

            axios.post(url, data, { headers: { Authorization: token }})
             .then(resp =>{
                 return res.status(200).json({ msg: resp.data.CustomerMessage })
             }).catch((err: any) => {
                return res.status(400).json({ msg: err.response.data.errorMessage })
             })
 
          } catch (error: any) {
              return res.status(500).json({ msg: error.message})
          }
      },
     //  callback url  
      response: async(req: IReqAuth, res: Response) => {
          try {
            const { Body } = req.body
            const response = Body.stkCallback.ResultDesc
            console.log(response)

            if(response !== 'The service request is processed successfully.')
             return res.status(400).json({ msg: response})

            return res.status(200).json({ msg: response })

          } catch (error: any) {
              return res.status(500).json({ msg: error.message})
          }
      }
}

const updateProducts = async( id: string, qty: number, oldSold: number, oldStock: number) => {
    await Products.findByIdAndUpdate(id, {
        sold: qty + oldSold, quantityInStock: oldStock - qty
    })
}

export default orderCtrl