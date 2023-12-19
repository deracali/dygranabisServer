import express from 'express'
import data from './data.js'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import BlogRoutes from './routes/BlogRoutes.js'
import planRoutes from './routes/planRoutes.js'
import contactRoutes from './routes/ContactRoutes.js'
import addressRoutes from './routes/AddressRoutes.js'
import PaymentRoutes from './routes/PaymentRoutes.js'

dotenv.config()

mongoose.connect("mongodb+srv://chideracalistus:economic00@cluster0.aryyobw.mongodb.net/dygranabis?retryWrites=true").then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log(err.message)
})

  

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())

app.use((err, req, res, next) => {
    res.status(500).send({message:err.message})
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRouter)
app.use('/api/blog',BlogRoutes)
app.use('/api/plan',planRoutes)
app.use('/api/contact',contactRoutes)
app.use('/api/address',addressRoutes)
app.use('/api/payment',PaymentRoutes)


const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server at http:localhost:${port}`)
})