import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
    name: {
        type:String, 
    },
    walletAddress: {
        type:String,        
    }
},
{
    timestamps:true
}
)

const Payment = mongoose.model('Payment', PaymentSchema)
export default Payment