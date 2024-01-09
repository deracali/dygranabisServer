import express from 'express'
import data from './data.js'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import BlogRoutes from './routes/BlogRoutes.js'
import planRoutes from './routes/planRoutes.js'
import contactRoutes from './routes/ContactRoutes.js'
import addressRoutes from './routes/AddressRoutes.js'
import PaymentRoutes from './routes/PaymentRoutes.js'

dotenv.config()

mongoose.connect("mongodb+srv://chideracalistus:economic00@cluster0.aryyobw.mongodb.net/dygranabis?retryWrites=true").then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log(err.message)
})

  

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())

app.use((err, req, res, next) => {
    res.status(500).send({message:err.message})
})
function subscribe(req, res, next) {
  let email = req.body.email; //Email entered
  let dataCenter = 'us21';
  let apiKey = '35e012270f2c8fd960a296d9873e5dae-us21';
  let listID = '54d2faae35';
  //Request settings
  let options = {
    url: `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listID}/members`,
    method: 'POST',
    headers: { 'content-type': 'application/json', 'Authorization': `apikey ${apiKey}` },
    body: JSON.stringify({ email_address: email, status: 'subscribed' })
  }
  // Make a simple POST call to MailChimp
  request(options, function (error, response, body) {
    try {
      let respObj = {}; //Initial response object
      if (response.statusCode === 200) {
        respObj = { success: `Subscribed using ${email}!`, message: JSON.parse(response.body) };
      } else {
        respObj = { error: `Error trying to subscribe ${email}. Please try again.`, message: JSON.parse(response.body) };
      }
      res.send(respObj);
    } catch (err) {
      let respErrorObj = { error: 'There was an error with your request', message: err.message };
      res.send(respErrorObj);
    }
  });
  next();
}
app.use('/api/products',productRoutes)
app.use('/api/users',userRouter)
app.use('/api/blog',BlogRoutes)
app.use('/api/plan',planRoutes)
app.use('/api/contact',contactRoutes)
app.use('/api/address',addressRoutes)
app.use('/api/payment',PaymentRoutes)
app.post('/subscribe', subscribe);



const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server at http:localhost:${port}`)
})
