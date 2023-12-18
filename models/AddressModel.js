import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    address: {
        type:String, 
    },
    location: {
        type:String,        
    },
    email: {
        type:String,
    },
    customerEmail: {
        type:String, 
    },
    mobileNo1: {
        type:String, 
    },
    mobileNo2: {
        type:String, 
    }
   
},
{
    timestamps:true
}
)

const Address = mongoose.model('Address', addressSchema)
export default Address