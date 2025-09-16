const express=require('express')
const router=express.Router();
 



const Listing=require('../models/listing')
const Review=require('../models/review')
const wrapAsync=require('../utils/wrapAsync')
const ExpressError=require('../utils/ExpressError')
const {listingSchema}=require('../schema')
const {reviewSchema}=require('../schema')




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
    let allListings= await Listing.find()
    res.render('listings/index',{allListings})
}))

router.route('/new')
.get((req,res)=>{
    res.render('listings/new')
})
.post(validateListing,wrapAsync(async(req,res)=>{    
    const newListing=new Listing(req.body.listing)
    await newListing.save()
    req.flash('flash',{type:'success',message:'New Listing Added successfully!'})
    res.redirect('/listings')

}))


router.route('/:id/edit')
.get(wrapAsync(async(req,res)=>{
    let{id}=req.params
    const listing=await Listing.findById(id)
    res.render('listings/edit',{listing})
}))
.put(validateListing,wrapAsync(async(req,res)=>{
    let{id}=req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
}))

router.route('/:id')
.get(wrapAsync(async(req,res)=>{
    let {id}=req.params
    let listing = await Listing.findById(id).populate('reviews')
    res.render('listings/show',{listing})
}))

router.route('/:id/reviews')
.post(validateReview,wrapAsync(async(req,res)=>{
    let {id}=req.params
    const newReview=new Review(req.body.review)
    const listing=await Listing.findById(id)
    await listing.reviews.push(newReview)
    await newReview.save()
    await listing.save()
    res.redirect(`/listings/${id}`) 

}))

router.route('/:id/reviews/:reviewId')
.delete(wrapAsync(async(req,res)=>{
    let{id,reviewId}=req.params
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/listings/${id}`)
}))

router.delete('/:id',wrapAsync(async(req,res)=>{
    let{id}=req.params
    await Listing.findByIdAndDelete(id)
    res.redirect('/')
}))


module.exports=router;