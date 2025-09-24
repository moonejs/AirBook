const express=require('express')
const router=express.Router();
 



const Listing=require('../models/listing')
const Review=require('../models/review')
const wrapAsync=require('../utils/wrapAsync')
const ExpressError=require('../utils/ExpressError')
const {listingSchema}=require('../schema')
const {reviewSchema}=require('../schema')
const {isLoggedIn, isOwner}=require('../middelware')



const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body,{ abortEarly: false })
    if (error){
        let errMsg=error.details.map((e)=>e.message).join(',')
        throw new ExpressError(400,errMsg)
    }
    else{
        next()
    }
}

const validateReview=(req,res,next)=>{
    let{error}=reviewSchema.validate(req.body,{abortEarly:false})
    if(error){
        let errMsg=error.details.map((e)=>e.message).join(',')
        throw new ExpressError(400,errMsg)
    }else{
        next()
    }
}




router.route('/')
.get(wrapAsync(async(req,res)=>{
    let user=req.user
    let allListings= await Listing.find()
    res.render('listings/index',{allListings,user});
}))

router.route('/new')
.get(isLoggedIn,(req,res)=>{
    res.render('listings/new')
})
.post(validateListing,wrapAsync(async(req,res)=>{    
    const newListing=new Listing(req.body.listing)
    newListing.owner=req.user._id
    await newListing.save()
    req.flash('flash',{type:'success',message:'New Listing Added successfully!'})
    res.redirect('/listings')

}))


router.route('/:id/edit')
.get(isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let{id}=req.params
    let listing= await Listing.findById(id)    
    if(!listing){
        req.flash('flash',{type:'warning',message:'Listing Not exist'})
        return res.redirect('/listings');
    }
    res.render('listings/edit',{listing})
}))
.put(isLoggedIn,validateListing,isOwner,wrapAsync(async(req,res)=>{
    let{id}=req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
}))

router.route('/:id')
.get(wrapAsync(async(req,res)=>{
    let {id}=req.params
    let listing = await Listing.findById(id).populate('reviews').populate('owner')
    if(!listing){
        req.flash('flash',{type:'warning',message:'Listing Not exist!'})
        res.redirect('/listings')
    }
    res.render('listings/show',{listing})
}))

router.route('/:id/reviews')
.post(isLoggedIn,validateReview,wrapAsync(async(req,res)=>{
    let {id}=req.params
    const newReview=new Review(req.body.review)
    const listing=await Listing.findById(id)
    newReview.author=req.user_id
    console.log(newReview);
    
    await listing.reviews.push(newReview)
    await newReview.save()
    await listing.save()
    req.flash('flash',{type:'success',message:'New Review Added successfully!'})
    res.redirect(`/listings/${id}`) 
}))

router.route('/:id/reviews/:reviewId')
.delete(isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let{id,reviewId}=req.params
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})
    console.log(id,reviewId);
    
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/listings/${id}`)
}))

router.delete('/:id',isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let{id}=req.params
    console.log('hello');
    
    await Listing.findByIdAndDelete(id)
    req.flash('flash',{type:'danger',message:'Listing Deleted successfully!'})
    res.redirect('/listings')
}))


module.exports=router;