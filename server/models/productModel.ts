import mongoose from 'mongoose'
import { IProducts } from '../config/interface'

const productSchema = new mongoose.Schema({
   title: {
       type: String,
       required: true,
       trim: true
   },
   slug: {
      type: String,
      required: true,
      trim: true
   },
   description: {
       type: String,
       required: true,
       trim: true
   },
   category: { type: mongoose.Types.ObjectId, ref: 'category'},
   price: {
      type: Number,
      required: true,
      default: 0
   },
   images: {
      type: Array,
      default: []
   }, 
   quantityInStock: {
       type: Number,
       default: 0,
       required: true
   },
   sold: {
      type: Number,
      default: 0
   },
   rating: {
      type: Number,
      default: 0
   },
   reviews: {
      type: Number,
      default: 0
   },
   likes: [
      {type: mongoose.Types.ObjectId, ref: 'users'}
   ]
},{
    timestamps: true
})

export default mongoose.model<IProducts>('product', productSchema)