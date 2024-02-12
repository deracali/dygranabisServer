import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    amount: {
    type:Number,
    default: 0,
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    }
})

const User = mongoose.model('User',userSchema)
export default User
