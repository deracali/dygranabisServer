import express from 'express'
import Product from '../models/ProductModel.js'
// import cloudinary from "../utils/cloudinary.js"

const productRoutes = express.Router()

productRoutes.get('/',async(req,res)=>{
    const products = await Product.find()
    res.send(products)
})

productRoutes.get('/slug/:slug', async (req,res)=>{
    const product = await Product.findOne({slug:req.params.slug})
    if(product){
        res.send(product)
    } else{
        res.status(404).send({message:'Product Not Found'})
    }
})
 
productRoutes.get('/products/:id', async (req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.send(product)
    } else{
        res.status(404).send({message:'Product Not Found'})
    }
})

productRoutes.post("/post",async(req,res)=>{
    
        const item = new Product({
          name: req.body.name,
          image: req.body.image,
          slug: req.body.slug,
          desc: req.body.desc,
          price: req.body.price,
          rating: req.body.rating,
         
        });
        const newItem = await item.save();
        res.send("successful");
        res.status(401).send({ message: 'Failed to post' });
      
})

productRoutes.patch("/:id",async(req,res)=>{
    let { id } = req.params

    const dataval = await Product.findOneAndUpdate({_id:id},{
        ...req.body
    }) 

    res.send(dataval)
})

productRoutes.delete("/:id",async(req,res)=>{
    let { id } = req.params

    const datadel = await Product.findOneAndDelete({_id:id}) 

    res.send(datadel)
})



export default productRoutes