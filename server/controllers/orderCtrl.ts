import  {Request, response, Response } from 'express'
import { generatePassword } from '../config/generateTokens'
import { IProducts, IReqAuth, IUser } from '../config/interface'
import { sendSms } from '../config/sendSms'
import Orders from '../models/ordersModel'
import axios from 'axios'
import Products from '../models/productModel'
import mongoose from 'mongoose'
import Notifications from '../models/notifcationModel'
import Users from '../models/userModel'
import sendEmail from '../config/sendEmail'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const dt = require('node-datetime')

const Pagination = (req: IReqAuth) => {
    const limit = Number(req.query.limit) * 1 || 5
    const page = Number(req.query.page) * 1 || 1
    const skip = (page - 1) * limit

    return { limit, page , skip}
}

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

           const users = await Users.find()

           users.map(user => {
                if(!req.user) return
                let orderId = new_order._id
                let user_data = req.user
                if(user.role === 'admin'){
                    let id = user._id
                    notifications( id, user_data, res, orderId)
                }
           })
    
           sendSms(phone, req.user.name)

           return res.status(200).json({ msg: 'You have successfully placed an order'})

          } catch (error: any) {
             return res.status(500).json({ msg: error.message})
          }
      },
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
                "CallBackURL": "https://fury-store.herokuapp.com/api/response",
                "AccountReference": "Fury Store",
                "TransactionDesc": "Lipa na m-pesa" 
              }

            axios.post(url, data, { headers: { Authorization: token }})
             .then(resp =>{
                 return res.status(200).json({ checkOutId: resp.data.CheckoutRequestID })
             }).catch((err: any) => {
                return res.status(400).json({ msg: err.response.data.errorMessage })
             })
 
          } catch (error: any) {
              return res.status(500).json({ msg: error.message})
          }
      },
      response: async (req: IReqAuth, res: Response) => {
          try {
              const { Body } = req.body
          } catch (error: any) {
             return res.status(500).json({ msg: error.message})
          }
      },
      mpesaResponse: async(req: IReqAuth, res: Response) => {
          if(!req.access_token) return res.status(400).json({ msg: 'Invalid authorization'})
          try {
            const formated = dt.create().format('YmdHMS')
            const password = generatePassword()
            
            let token = 'Bearer '+ req.access_token
            const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query'
            
            const data = {
                "BusinessShortCode": `${process.env.SHORT_CODE}`,
                "Password": password,
                "Timestamp": formated,
                "CheckoutRequestID": req.params.checkOutId
            }

            getMpesaResponse(url, data, token, res)

          } catch (error: any) {
              return res.status(500).json({ msg: error.message})
          }
      },
      stripePayment: async(req: IReqAuth, res: Response) => {
          if(!req.user) return res.status(400).json({ msg: 'Invalid authorization'})
          try {
         
            const { location,paymentMethod,notes, phone, cart, tokenId, amount } = req.body

            const data = await stripe.charges.create({ source: tokenId, amount: amount, currency: "usd" })

            const { paid } = data

            if(paid !== true) return res.status(400).json({ msg: 'Payment failed'})

            const new_cart = <IProducts[]>cart

            new_cart.filter(item => {
                updateProducts(item._id, item.qty, item.sold, item.quantityInStock)
            })

            const new_order = new Orders({
                location, paymentMethod, phone, paid, notes, cart, user: req.user._id
            })

            await new_order.save()

            sendSms(phone, req.user.name)

           return res.status(200).json({ msg: 'You have successfully placed an order'})

          } catch (error: any) {
             return res.status(500).json({ msg: error.message})
          }
      },
      getUserOrders: async(req: IReqAuth, res: Response) => {
          if(!req.user) return res.status(200).json({ msg: 'Invalid authorization'})
          try {
              const { limit, skip } = Pagination(req)
              const Data = await Orders.aggregate([
                {
                    $facet: {
                        totalData: [
                            { $match: { user: new mongoose.Types.ObjectId(req.params.id) }},
                            //  lookup user
                            {
                                $lookup: {
                                    from: "users",
                                    let: { user_id: "$user"},
                                    pipeline: [
                                        { $match: { $expr: { $eq: [ "$_id", "$$user_id"] }}},
                                        { $project: { password: 0}}
                                    ],
                                    as: "user"
                                }
                            },
                            // array -> object
                            { $unwind: "$user"},
                            // sort
                            { $sort: { "createdAt": -1 }},
                            // pagination
                            { $skip: skip },
                            { $limit: limit}

                        ],
                        totalCount: [
                            { $match: { user: new mongoose.Types.ObjectId(req.params.id)}},
                            { $count: 'count'}
                        ]
                    }
                },
                {
                  $project: {
                     count: { $arrayElemAt: ['$totalCount.count', 0]},
                     totalData: 1
                  }
                }
              ])

              const orders = Data[0].totalData
              const count = Data[0].count

             //pagination
             let total = 0
             
             if(count % limit === 0){
                 total = count / limit
             }else{
                 total = Math.floor(count / limit)
             }

             return res.status(200).json({ orders, total })

          } catch (error: any) {
              return res.status(500).json({ msg: error.message})   
          }
      },
      getOrderById: async(req: IReqAuth, res: Response) => {
          try {
             if(!mongoose.isValidObjectId(req.params.id))
              return res.status(400).json({ msg: 'Invalid order id'})

              const order = await Orders.findOne({ _id: req.params.id }).populate("user", "-password")

              if(!order) return res.status(400).json({ msg: 'No order was found'})
               
              return res.status(200).json({ order })

          } catch (error: any) {
              return res.status(500).json({ msg: error.message})
          }
      },
      getAllOrders: async(req: IReqAuth, res: Response) => {
          if(!req.user) return res.status(400).json({ msg: 'Invalid authorization'})
          if(req.user.role !== 'admin') return res.status(400).json({ msg: 'Invalid authoriation'})

          try {
              const orders = await Orders.find().populate('user').sort('-createdAt')
              return res.status(200).json({ orders })

          } catch (error: any) {
              return res.status(500).json({ msg: error.message })
          }
      },
      updateOrders: async(req: IReqAuth, res: Response) => {
         if(!req.user) return res.status(400).json({ msg: 'Invalid authorization'})
         if(req.user.role !== 'admin') return res.status(400).json({ msg: 'Invalid authoriation'})

          try {
              const { status, paid} = req.body
              const new_order = await Orders.findByIdAndUpdate(req.params.id, { status, paid}, { new: true}).populate('user','-password')

              return res.status(200).json({ msg: 'Update success', new_order })

          } catch (error: any) {
              return res.status(500).json({ msg: error.message })
          }
      },
      deleteOrder: async(req: IReqAuth, res: Response) => {
          if(!req.user) return res.status(400).json({ msg: 'Invalid authorization'})
          if(req.user.role !== 'admin') return res.status(400).json({ msg: 'Invalid authoriation'})
          try {     
               await Orders.findByIdAndUpdate(req.params.id)
               return res.status(200).json({ msg: 'delete success'})

          } catch (error: any) {
              return res.status(500).json({ msg: error.message })
          }
      }
     }

const getMpesaResponse = async (url: string, data: object, token: string, res: Response) => {
    try {
        const response = await axios.post(url, data, { headers: { Authorization: token}})

        if(response.data.ResultCode !== 0){
           const reply = 'The service request is processed successfully.'
           if(response.data.ResultDesc === reply){
              clearTimeout()
              return res.status(200).json({ msg: response.data.ResultDesc})
           }else{
              clearTimeout()
              return res.status(400).json({ msg: response.data.ResultDesc })
            }
        }else if(response.data.ResultCode === 0){
                console.log({ ms2: response.data})
                return res.status(400).json({ msg: response.data.ResultDesc })
        }
    } catch (error: any) { 
        const err = error.response.data.errorMessage 
        if(err === 'The transaction is being processed'){
            setTimeout(()=> getMpesaResponse(url, data, token,res), 2500)
        }
    }
}

const updateProducts = async( id: string, qty: number, oldSold: number, oldStock: number) => {
    await Products.findByIdAndUpdate(id, {
        sold: qty + oldSold, quantityInStock: oldStock - qty
    })
}

export const notifications = async(id: string, user: IUser, res: Response, order_id: string) => {
    let msg = `${user.name} has successfully placed an order`
    let icon = user.avatar as string
    let url = `${process.env.BASE_URL}/order/${order_id}`
    let url_id = `order/${order_id}`

    const notify = new Notifications({ id, user: user._id, message: msg, icon, url, url_id })
    await notify.save()
}

export default orderCtrl