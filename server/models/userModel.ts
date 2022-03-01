import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    account: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/duzm9in6w/image/upload/v1636649949/blog/avatar_jwffwk.jpg'
    },
    role: {
        type: String,
        default: 'user'
    },
    root: {
        type: Boolean,
        default: false
    },
    wishList: {
       type: Array,
       default: []
    },
    subscription: {
        type: Array,
        default: []
    }
},{
    timestamps: true
})

export default mongoose.model('user', userSchema)