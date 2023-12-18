import mongoose from 'mongoose'

const planSchema = new mongoose.Schema({
    plan: {
        type:String, 
       
    },
    price1: {
        type:String, 
       
       
    },
    price2: {
        type:String, 
       
    },
    desc: {
        type:String, 
         
    }
   
},
{
    timestamps:true
}
)

const Plan = mongoose.model('Plan', planSchema)
export default Plan