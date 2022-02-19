import mongoose from 'mongoose'

const URI = `${process.env.MONGODB_URL}`

const connectDB = () => {
    mongoose.connect(URI)
        .then(()=> console.log('DB connection success..'))
        .catch(err => {
            console.log(err.message)
            setTimeout(connectDB, 500)
        })
}

connectDB()