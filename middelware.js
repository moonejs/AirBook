const Listing=require('./models/listing')

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl  
        req.flash('flash',{type:'warning',message:'Login required'})
        return res.redirect('/login')
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;   
    }
    next()
}

module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params
    let listing= await Listing.findById(id)    
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash('flash',{type:'danger',message:'you do not have access'})
        return res.redirect(`/listings/${id}`)
        
    }
    next()
}