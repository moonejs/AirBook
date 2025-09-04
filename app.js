const express=require('express')
const mongoose = require('mongoose');
const path=require('path')
const expressLayouts = require('express-ejs-layouts');

const Listing=require('./models/listing')

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
app.use(express.static(path.join(__dirname, "/public/css")));   
app.use(express.static(path.join(__dirname, "/public/js")));  

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.set('layout', 'base');





app.get('/',(req,res)=>{
    res.render('index')
})


app.route('/listings')
.get(async(req,res)=>{
    let allListings= await Listing.find()
    res.send(allListings)
})

app.route('/listings/:id')
.get(async(req,res)=>{
    let {id}=req.params
    let listing = await Listing.findById(id)
    res.send(listing)
})

app.listen(port,()=>{
    console.log('server started');
    
})