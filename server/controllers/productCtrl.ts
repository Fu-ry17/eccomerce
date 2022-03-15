import { Request, Response } from "express";
import { IProducts, IReqAuth, IUser } from "../config/interface";
import Products from "../models/productModel";
import Users from "../models/userModel"
import Notifications from "../models/notifcationModel"
import mongoose from 'mongoose'

const Pagination = (req: IReqAuth) => {
     const limit = Number(req.query.limit) * 1 || 3
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

            const users = await Users.find().select('-password')

            users.map(user => {
                if(user.role !== 'admin'){
                    let id = user._id
                    let productId = newProduct._id
                    notifications(id, user, res, newProduct ,productId)
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
                        products: { $slice: [ '$products', 0, 5]},
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
                            { $limit: limit},
                            { $skip: skip }
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
     },
     updateProducts: async(req: IReqAuth, res: Response) => {
        if(!req.user) return res.status(400).json({ msg: 'invalid authoriation'})
        if(req.user.role !== 'admin') return res.status(400).json({ msg: 'invalid authoriation'})

         try {
               
            const { title, description, category, price, images, quantityInStock } = req.body

            const new_title = title.toLowerCase()

            const slug = title.toLowerCase().replace(/ /g, '')

            const check = await Products.findOne({ _id: req.params.id })

            if(!check) return res.status(400).json({ msg: 'No product was found!'})

            const updatedProduct = await Products.findByIdAndUpdate(req.params.id,
                 { title: new_title , description, category, price, images, quantityInStock, slug },{ new: true})
            
            return res.status(200).json({ msg: 'Update success..', updatedProduct })

         } catch (error: any) {
            return res.status(500).json({ msg: error.message})
         }
     },
     deleteProduct: async(req: IReqAuth, res: Response) => {
        if(!req.user) return res.status(400).json({ msg: 'invalid authoriation'})
        if(req.user.role !== 'admin') return res.status(400).json({ msg: 'invalid authoriation'})

         try {             
            const check = await Products.findOne({ _id: req.params.id })

            if(!check) return res.status(400).json({ msg: 'No product was found!'})

            await Products.findByIdAndDelete(req.params.id)
            
            return res.status(200).json({ msg: 'Delete success..'})

         } catch (error: any) {
            return res.status(500).json({ msg: error.message})
         }
     }
}

export const notifications = async(id: string, user: IUser, res: Response, product: any, product_id: string) => {
    let msg = `Hello! ${user.name}, ${product.title} is now available`
    let icon = product.images[0].url as string
    let url = `${process.env.BASE_URL}/shop/${product_id}`
    let url_id = `shop/${product.slug}`

    const notify = new Notifications({ id, user: user._id, message: msg, icon, url, url_id })
    await notify.save()

}

export default productCtrl