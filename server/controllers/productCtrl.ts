import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Products from "../models/productModel";
import Users from "../models/userModel"
import Notification from "../models/notifcationModel"
import mongoose from 'mongoose'

const Pagination = (req: IReqAuth) => {
     const limit = Number(req.query.limit) * 1 || 4
     const page = Number(req.query.page) * 1 || 1
     const skip = (page - 1) * limit

     return { limit, page , skip}
}

const productCtrl  = {
     createProduct: async(req: IReqAuth, res: Response) => {
         if(!req.user) return res.status(400).json({ msg: 'invalid authoriation'})

         if(req.user.role !== 'admin') return res.status(400).json({ msg: 'invalid authoriation'})
         try {
            
            const { title, description, category, price, images, quantityInStock } = req.body

            const new_title = title.toLowerCase()

            const slug = title.toLowerCase().replace(/ /g, '')

            const check = await Products.findOne({ title: new_title })

            if(check) return res.status(400).json({ msg: 'the product already exists'})

            const newProduct = new Products({ title: new_title , description, category, price, images, quantityInStock, slug })

            await newProduct.save()

            const users = await Users.find()

            let message = 'A new product has been created'
            let icon = 'https://cdn.vox-cdn.com/thumbor/BG_Wo6a2Xs5SYloPZT_37wsgwDE=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22000282/maxresdefault.jpg'
            users.map( async user => {
                if(user.role !== 'admin'){
                    const new_notification = new Notification({
                        user: user._id, message, url: newProduct.slug, icon
                    })          
                    await new_notification.save()  
                }        
             })

            return res.status(200).json({ msg: 'Product created!' , newProduct })

         } catch (error: any) {
             return res.status(500).json({ msg: error.message })
         }
     },
     getProducts: async(req: Request, res: Response) => {
         try {
             const products = await Products.aggregate([
                 {
                     $lookup: {
                         'from': 'categories',
                         'localField': 'category',
                         'foreignField': '_id',
                         'as': 'category'
                     }
                 },
                //  array -> object
                {$unwind: '$category'},
                // sort
                {$sort: { 'createdAt': -1 }},
                // group
                {
                    $group: {
                        _id: "$category._id",
                        name: { $first: "$category.name"},
                        products: {$push: "$$ROOT"},
                        count: { $sum: 1}
                    }
                },
                // paginate
                {
                    $project: {
                        products: { $slice: [ '$products', 0, 8]},
                        name: 1,
                        count: 1
                    }
                }

             ])
               
             
             return res.status(200).json({ products })

         } catch (error: any) {
             return res.status(500).json({ msg: error.message })
         }
     },
     getProductsByCategory: async(req: IReqAuth, res: Response) => {
         try {
            const {limit, skip} = Pagination(req)

            const Data = await Products.aggregate([
                {
                    $facet: {
                        totalData: [
                            { $match: { category: new mongoose.Types.ObjectId(req.params.id )}},
                            { $sort: { "createdAt": -1 }},
                            {$limit: limit},
                            {$skip: skip}
                        ],
                        totalCount: [
                            { $match: { category: new mongoose.Types.ObjectId(req.params.id)}},
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

            const products = Data[0].totalData
            const count = Data[0].count

            let total = 0

            if(count % limit === 0){
                total = count / limit
            }else{
                total = Math.floor(count / limit)
            }

            return res.status(200).json({ products, total })

         } catch (error: any) {
             return res.status(500).json({ msg: error.message })
         }
     },
     getAllProducts: async(req: Request, res: Response) => {      
         try {
             const products = await Products.find()
             return res.status(200).json({ products})

         } catch (error: any) {
            return res.status(500).json({ msg: error.message})
         }
     }
}

export default productCtrl