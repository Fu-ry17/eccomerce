import { Request, Response } from "express"
import { IReqAuth } from "../config/interface"
import Category from "../models/categoryModel"


const categoryCtrl = {
    getCategory: async(req: Request, res: Response) => {
        try {
            const category = await Category.find().sort('-createdAt')

            return res.status(200).json({ category })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    createCategory: async(req: IReqAuth, res: Response) => {
        if(!req.user) 
           return res.status(400).json({ msg: 'invalid authorization'})

        if(req.user.role !== 'admin') 
            return res.status(400).json({ msg: 'invalid authorization'})
        try {
            const { name } = req.body
            const new_name = name.toLowerCase()

            const check = await Category.findOne({ name: new_name })
            if(check) return res.status(400).json({ msg: 'the category already exists'})

            const newCategory = new Category({ name: new_name })
            await newCategory.save()

            return res.status(200).json({ msg: 'category created', newCategory  })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateCategory: async(req: IReqAuth, res: Response) => {
        if(!req.user) 
           return res.status(400).json({ msg: 'invalid authorization'})

        if(req.user.role !== 'admin') 
            return res.status(400).json({ msg: 'invalid authorization'})
        try {
            const { name } = req.body
            const new_name = name.toLowerCase()

            const check = await Category.findById(req.params.id)
            if(!check) return res.status(400).json({ msg: 'no category was found'})

            await Category.findByIdAndUpdate(req.params.id, { name: new_name}, { new: true})      

            return res.status(200).json({ msg: 'update success..' })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteCategory: async(req: IReqAuth, res: Response) => {
        if(!req.user) 
           return res.status(400).json({ msg: 'invalid authorization'})

        if(req.user.role !== 'admin') 
            return res.status(400).json({ msg: 'invalid authorization'})

        try {
           
            const check = await Category.findById(req.params.id)
            if(!check) return res.status(400).json({ msg: 'no category was found'})

            await Category.findByIdAndDelete(req.params.id)      

            return res.status(200).json({ msg: 'delete success..' })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
}

export default categoryCtrl