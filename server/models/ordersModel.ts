import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
   user: { type: mongoose.Types.ObjectId, ref: 'user'}, 
   location: {
       type: String,
       default: ''
   },
   paymentMethod: {
       type: String,
       required: true
   },
   notes: {
       type: String,
       default: ''
   },
   phone: {
    type: String,
    default: ''
   },
   paid: {
       type: Boolean,
       default: false
   },
   status: {
       type: Boolean,
       default: false
   },
   cart: {
       type: Array,
       default: []
   }
},{
    timestamps: true
})

export default mongoose.model('Order', orderSchema)