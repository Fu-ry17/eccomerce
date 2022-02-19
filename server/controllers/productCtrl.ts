import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Products from "../models/productModel";

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
     getProductById: async(req: Request, res: Response) => {
         try {
            const product = await Products.findOne({ slug: req.params.slug})

            if(!product) 
                return res.status(400).json({ msg: 'No product was found!'})

            return res.status(200).json({ product })

         } catch (error: any) {
             return res.status(500).json({ msg: error.message})
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