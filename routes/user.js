const express=require('express')
const router=express.Router();
const User=require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');

router.route('/signup')
.get((req,res)=>{
    res.render('users/signup')
})
.post(wrapAsync(async(req,res)=>{
    try{
        let {username,password,confirmPassword}=req.body
        console.log(username,password);
        if(confirmPassword !== password){
            req.flash('flash',{type:'warning',message:'password not matched'})
            res.redirect('/signup') 
        }else{
            const newUser= new User({username})
            const registeredUser= await User.register(newUser,password)
            console.log(registeredUser);
            req.flash('flash',{type:'success',message:'Account created'})
            res.redirect('/login') 
        }
    }
    catch(e){
        req.flash('flash',{type:'danger',message:e.message}) 
        res.redirect('/signup') 
    }
}))




router.route('/login')
.get((req,res)=>{
    res.render('users/login')
})
.post(passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}), wrapAsync(async(req,res)=>{
    req.flash('flash',{type:'success',message:'Welcome  '})
    res.redirect('/listings')

}))

module.exports=router