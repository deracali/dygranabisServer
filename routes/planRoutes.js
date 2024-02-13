import express from 'express'
import Plan from '../models/PlanModel.js'


const planRoutes = express.Router()

planRoutes.get("/",async(req,res)=>{
    let data = await Plan.find({}).sort({"createdAt":-1}).limit(8)
    res.status(200).json(data)
   
})

planRoutes.post("/post",async(req,res)=>{
    const newplan = new Plan({
        plan: req.body.plan,
        price1: req.body.price1,
        price2: req.body.price2,
        desc: req.body.desc,
    })

    const val = await newplan.save()
    res.send("posted")

    res.status(401).send({ message: 'Failed to post' });
})

planRoutes.patch("/:id",async(req,res)=>{
    let { id } = req.params
   
    const dataval = await Plan.findOneAndUpdate({_id:id}, req.body, {new: true})

    res.send(dataval)
})

planRoutes.delete("/:id",async(req,res)=>{
    let { id } = req.params

    const datadel = await Plan.findOneAndDelete({_id:id}) 

    res.send(datadel)
})


export default planRoutes
