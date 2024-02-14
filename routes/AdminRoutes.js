import express from 'express'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin.js'
import cors from 'cors'
import { generateToken } from '../utils/utils.js'

const adminRouter = express.Router()
adminRouter.use(express.json())

adminRouter.get("/",async(req,res)=>{
  let limit = req.query.limit
  let data = await Admin.find().sort({"createdAt":-1}).limit(limit)
  res.status(200).json(data)
 
})

adminRouter.post('/signin',async(req,res)=>{
  const user = await Admin.findOne({ email: req.body.email });
  
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: 'Invalid email or password' });
})

adminRouter.post('/signup',async(req,res)=>{
    const newUser = new Admin({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      email: user.email,
      token: generateToken(user),
    });
    res.status(401).send({ message: 'Invalid email or password' });

  })
  
  
  export default adminRouter
