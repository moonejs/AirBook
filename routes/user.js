const express=require('express')
const router=express.Router();
const User=require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const {isLoggedIn, saveRedirectUrl}=require('../middelware')


router.route('/signup')
.get((req,res)=>{
    res.render('users/signup')
})
.post(wrapAsync(async(req,res)=>{
    try{
        let {username,password,confirmPassword}=req.body
        
        if(confirmPassword !== password){
            req.flash('flash',{type:'warning',message:'password not matched'})
            res.redirect('/signup') 
        }else{
            const newUser= new User({username})
            const registeredUser= await User.register(newUser,password)
            req.login(registeredUser,(err)=>{
                if(err){
                    next(err)
                }
                req.flash('flash',{type:'success',message:'Account created'})
                res.redirect('/listings')
            })
             
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
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),wrapAsync(async(req,res)=>{
    req.flash('flash',{type:'success',message:'Welcome  '})
    let redirect=res.locals.redirectUrl ||'/listings'
    res.redirect(redirect)

}))



router.route('/logout')
.get(isLoggedIn,(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash('flash',{type:'info',message:'Logout successfully'})
        res.redirect('/listings')
    })
})

module.exports=router