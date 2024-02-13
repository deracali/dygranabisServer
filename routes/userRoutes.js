import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/UserModel.js'
import { generateToken } from '../utils/utils.js'

const userRouter = express.Router()
userRouter.use(express.json())

userRouter.get("/",async(req,res)=>{
  let limit = req.query.limit
  let data = await User.find().sort({"createdAt":-1}).limit(limit)
  res.status(200).json(data)
 
})

userRouter.get('/email/:email', async (req,res)=>{
    const user = await User.findOne({email:req.params.email})
    if(user){
        res.send(user)
    } else{
        res.status(404).send({message:'User Not Found'})
    }
})

userRouter.patch("/:id",async(req,res)=>{
    let { id } = req.params

    const dataval = await User.findOneAndUpdate({_id:id}, req.body, {new: true}) 

    res.send(dataval)
})

userRouter.delete("/:id",async(req,res)=>{
    let { id } = req.params

    const datadel = await User.findOneAndDelete({_id:id}) 

    res.send(datadel)
})

userRouter.post('/signin',async(req,res)=>{
  const user = await User.findOne({ email: req.body.email });
  
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        amount: user.amount,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: 'Invalid email or password' });
})


  userRouter.post('/signup',async(req,res)=>{
    const newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      email: user.email,
      amount: user.amount,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
    res.status(401).send({ message: 'Invalid email or password' });

  })
  
  
  export default userRouter
