import express from 'express'
import Address from '../models/AddressModel.js'


const addressRoutes = express.Router()

addressRoutes.get("/",async(req,res)=>{
    let data = await Address.find({}).sort({"createdAt":-1}).limit(8)
    res.status(200).json(data)
   
})

addressRoutes.post("/",async(req,res)=>{
    const newAddress = new Address({
        address: req.body.address,
        location: req.body.location,
        email: req.body.email,
        customerEmail: req.body.customerEmail,
        mobileNo1: req.body.mobileNo1,
        mobileNo2: req.body.mobileNo2,
    })

    const val = await newAddress.save()
    res.send("posted")

    res.status(401).send({ message: 'Failed to post' });
})

addressRoutes.patch("/:id",async(req,res)=>{
    let { id } = req.params
    const updates = req.body
    const dataval = await Address.findOneAndUpdate({_id:id},{$set: updates})

    res.send(dataval)
})

addressRoutes.delete("/:id",async(req,res)=>{
    let { id } = req.params

    const datadel = await Address.findOneAndDelete({_id:id}) 

    res.send(datadel)
})


export default addressRoutes
