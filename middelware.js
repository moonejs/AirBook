const Listing=require('./models/listing')

const {listingSchema}=require('./schema')
const {reviewSchema}=require('./schema')
const ExpressError=require('./utils/ExpressError')


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
module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body,{ abortEarly: false })
    if (error){
        let errMsg=error.details.map((e)=>e.message).join(',')
        throw new ExpressError(400,errMsg)
    }
    else{
        next()
    }
}

module.exports.validateReview=(req,res,next)=>{
    let{error}=reviewSchema.validate(req.body,{abortEarly:false})
    if(error){
        let errMsg=error.details.map((e)=>e.message).join(',')
        throw new ExpressError(400,errMsg)
    }else{
        next()
    }
}