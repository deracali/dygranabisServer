import express from 'express'
import Blog from '../models/BlogModels.js'

const BlogRoutes = express.Router()

BlogRoutes.get("/",async(req,res)=>{
    let data = await Blog.find().sort({"createdAt":-1}).limit(8)
    res.status(200).json(data)
   
})

BlogRoutes.get('/:id', async (req,res)=>{
    let { id } = req.params
    const blog = await Blog.findOne({_id:id})
    if(blog){
        res.send(blog)
    } else{
        res.status(404).send({message:'Blog Not Found'})
    }
})

BlogRoutes.post("/post",async(req,res)=>{
   
    const newBlog = new Blog({
        image: req.body.image,
        posterName: req.body.posterName,
        image1: req.body.image1,
        image2: req.body.image2,
        title: req.body.title,
        subtitle: req.body.subtitle,
        paragraph1: req.body.paragraph1,
        paragraph2: req.body.paragraph2,
        paragraph3: req.body.paragraph3,
        paragraph4: req.body.paragraph4,
        paragraph5: req.body.paragraph5,
    })

    const val = await newBlog.save()
    res.send("posted")

    res.status(401).send({ message: 'Failed to post' });
})

export default BlogRoutes