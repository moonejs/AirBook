const express=require('express')
const mongoose = require('mongoose');
const path=require('path')
const expressLayouts = require('express-ejs-layouts');
const methodOverride=require('method-override')


const listings=require('./routes/listings')


const port=8080
const app=express()
const MONGO_URL = 'mongodb://127.0.0.1:27017/airbook'



main()
.then(()=>{console.log("Db connected successfully!");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}


app.use(expressLayouts);
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(methodOverride("_method"))



app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.set('layout', 'layouts/base');





app.get('/',(req,res)=>{
    res.send('hello')
})



app.use('/listings',listings)





app.use((req,res,next)=>{
    next(new ExpressError(404,'Page not found'))
})

app.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(404).render('error', { message: 'Listing not found' });
  }
  next(err);
});

app.use((err,req,res,next)=>{
   const { statusCode = 500, message = 'Something went wrong!' } = err;
   if (statusCode == 404) {
      return res.status(404).render('error', { message });
   }
   else{
       res.status(statusCode).send(message)
   }
})

app.listen(port,()=>{
    console.log('server started');
    
})