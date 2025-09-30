if (process.env.NODE_ENV != 'production'){
  require('dotenv').config()

}

const express=require('express')
const mongoose = require('mongoose');
const path=require('path')
const expressLayouts = require('express-ejs-layouts');
const methodOverride=require('method-override')
const session=require('express-session')
const MongoStore = require('connect-mongo');
const flash=require('connect-flash')
const passport=require('passport')
const localStrategy=require('passport-local')
const User=require('./models/user')
const ExpressError=require('./utils/ExpressError')





const listingsRouter=require('./routes/listings')
const userRouter=require('./routes/user');
const { log } = require('console');


const port=8080
const app=express()
// const MONGO_URL = 'mongodb://127.0.0.1:27017/airbook'
const dbUrl = process.env.ATLASDB_URL;

const store =MongoStore.create({
  mongoUrl:dbUrl,
  crypt:{
    secret:process.env.SECRET
  },
  touchAfter:24*3600
})
store.on("error",()=>{
  console.log("mongo Atlas error",err);
  
})

const sessionOptions={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  }
};



main()
.then(()=>{console.log("Db connected successfully!");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}


app.use(expressLayouts);
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(methodOverride("_method"))
app.use(session(sessionOptions))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.set('layout', 'layouts/base');





app.get('/',(req,res)=>{
    res.send('hello')
})


app.use((req,res,next)=>{
  const flashData=req.flash('flash')[0]
  res.locals.flash=flashData||null
  res.locals.currUser=req.user
  next()

})
app.use('/listings',listingsRouter)

app.use('/',userRouter)

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