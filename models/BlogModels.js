import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({

    image: {
        type:String,        
    },

    posterName: {
        type:String, 
    
        
    },
   image1 : {
        type:String, 
    
        
    },
   image2 : {
        type:String, 
    
        
    },
    title: {
        type:String, 
    
        
    },
    subtitle: {
        type:String, 
    
        
    },
    paragraph1: {
        type:String, 
    
        

    },
    paragraph2: {
        type:String, 
    
        
       
    },
    paragraph3: {
        type:String, 
    
        
       
    },
    paragraph4: {
        type:String, 
       
    },
    paragraph5: {
        type:String, 
       
    },
   
},
{
    timestamps:true
}
)

const Blog = mongoose.model('Blog', BlogSchema)
export default Blog