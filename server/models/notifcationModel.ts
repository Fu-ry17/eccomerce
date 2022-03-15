import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
     id: {
         type: String,
         required: true
     },
     message: {
         type: String,
         required: true
     },
     user: { type: mongoose.Types.ObjectId, ref: 'user'}, 
     url: {
         type: String,
         default: ''
     },
     url_id: {
        type: String,
        required: true
     },
     read: {
         type: Boolean,
         default: false
     },
     icon: {
         type: String,
         required: true
     }
}, {
    timestamps: true
})

export default mongoose.model('Notification', notificationSchema)