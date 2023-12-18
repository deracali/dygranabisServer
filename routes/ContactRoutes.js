import express from 'express'
import Contact from '../models/ContactModel.js'


const contactRoutes = express.Router()

contactRoutes.get("/",async(req,res)=>{
    let data = await Contact.find().sort({"createdAt":-1}).limit(8)
    res.status(200).json(data)
   
})

contactRoutes.post("/post",async(req,res)=>{
   
    const newplan = new Contact({
        name: req.body.name,
        email: req.body.email,
        text: req.body.text,
    })

    const val = await newplan.save()
    res.send("posted")

    res.status(401).send({ message: 'Failed to post' });
})



export default contactRoutes