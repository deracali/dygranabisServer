import express from 'express'
import Payment from '../models/PaymentModel.js'


const PaymentRoutes = express.Router()

PaymentRoutes.get("/",async(req,res)=>{
    let data = await Payment.find({}).sort({"createdAt":-1}).limit(8)
    res.status(200).json(data)
   
})

PaymentRoutes.post("/",async(req,res)=>{
    const newAddress = new Payment({
        name: req.body.name,
        walletAddress: req.body.walletAddress,
    })

    const val = await newAddress.save()
    res.send("posted")

    res.status(401).send({ message: 'Failed to post' });
})

PaymentRoutes.patch("/:id",async(req,res)=>{
    let { id } = req.params

    const dataval = await Payment.findOneAndUpdate({_id:id},{
        ...req.body
    }) 

    res.send(dataval)
})

PaymentRoutes.delete("/:id",async(req,res)=>{
    let { id } = req.params

    const datadel = await Payment.findOneAndDelete({_id:id}) 

    res.send(datadel)
})


export default PaymentRoutes