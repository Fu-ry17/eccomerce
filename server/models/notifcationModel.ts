import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
     message: {
         type: String,
         required: true
     },
     user: { type: mongoose.Types.ObjectId, ref: 'users'}, 
     url: {
         type: String,
         default: ''
     },
     icon: {
         type: String,
         required: true
     }
}, {
    timestamps: true
})

export default mongoose.model('Notification', notificationSchema)