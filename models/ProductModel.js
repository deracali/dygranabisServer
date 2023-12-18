import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type:String, 
       
    },
    image: {
        type:String, 
       
       
    },
    slug: {
        type:String, 
       required:true,
       unique:true
    },
    desc: {
        type:String, 
       
       
    },
    price: {
        type:String, 
       
       
    },
    rating: {
        type:String, 
       
       
    },
   
},
{
    timestamps:true
}
)

const Product = mongoose.model('Product', productSchema)
export default Product