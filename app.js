const express=require('express')
const mongoose = require('mongoose');
const path=require('path')
const expressLayouts = require('express-ejs-layouts');
const methodOverride=require('method-override')



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
app.use(express.static(path.join(__dirname,"public")));
// app.use(express.static(path.join(__dirname, "/public/css")));   
// app.use(express.static(path.join(__dirname, "/public/js")));  
app.use(express.json());
app.use(methodOverride("_method"))



app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.set('layout', 'layouts/base');





app.get('/',(req,res)=>{
    res.send('hello')
})


app.route('/listings')
.get(async(req,res)=>{
    let allListings= await Listing.find()
    res.render('listings/index',{allListings})
})

app.route('/listings/new')
.get((req,res)=>{
    res.render('listings/new')
})
.post(async(req,res)=>{
    const newListing=new Listing(req.body.listing)
    await newListing.save()
    res.redirect('/listings')
    
})


app.route('/listings/:id/edit')
.get(async(req,res)=>{
    let{id}=req.params
    const listing=await Listing.findById(id)
    res.render('listings/edit',{listing})
})
.put(async(req,res)=>{
    let{id}=req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
})

app.route('/listings/:id')
.get(async(req,res)=>{
    let {id}=req.params
    let listing = await Listing.findById(id)
    res.render('listings/show',{listing})
})

app.delete('/listings/:id',async(req,res)=>{
    let{id}=req.params
    await Listing.findByIdAndDelete(id)
})


app.listen(port,()=>{
    console.log('server started');
    
})