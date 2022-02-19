import { Request, Response, NextFunction } from "express"

const validProducts = async(req: Request,res: Response, next: NextFunction ) =>{
    try {
        const { title, description, category, price, images, quantityInStock } = req.body

        if(!title) 
            return res.status(400).json({ msg: 'title is required'})

        if(!description) 
            return res.status(400).json({ msg: 'description is required'})
            
        if(!category) 
            return res.status(400).json({ msg: 'category is required'})

        if(!price) 
            return res.status(400).json({ msg: 'price is required'})
        
        if(!quantityInStock) 
            return res.status(400).json({ msg: 'quantity is required'})

        if(!images) 
            return res.status(400).json({ msg: 'upload an image'})

        next()
                          
    } catch (error: any) {
        return res.status(500).json({ msg: error.message })
    }   
}

export default validProducts