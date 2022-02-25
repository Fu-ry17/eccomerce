import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import routes from './routes'

// database
import './config/database'

const app = express()
// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(morgan('dev'))
app.use(cookieParser())

// routes
app.use('/api', routes.authRouter)
app.use('/api', routes.userRouter)
app.use('/api', routes.categoryRouter)
app.use('/api', routes.productRouter)
app.use('/api', routes.orderRouter)
app.use('/api', routes.notiticationRouter)

// ports
const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}...`)
})