const Listing=require('../models/listing')
const Review=require('../models/review')


module.exports.index=async(req,res)=>{
    let user=req.user
    let allListings= await Listing.find()
    res.render('listings/index',{allListings,user});
}

module.exports.newListingForm=(req,res)=>{
    res.render('listings/new')
}

module.exports.newListingCreate=async(req,res)=>{ 
    let url=req.file.path
    let filename=req.file.filename
       
    const newListing=new Listing(req.body.listing)
    newListing.owner=req.user._id
    newListing.image={url,filename};
    await newListing.save()
    req.flash('flash',{type:'success',message:'New Listing Added successfully!'})
    res.redirect('/listings')

}


module.exports.editListingForm=async(req,res)=>{
    let{id}=req.params
    let listing= await Listing.findById(id)    
    if(!listing){
        req.flash('flash',{type:'warning',message:'Listing Not exist'})
        return res.redirect('/listings');
    }
    res.render('listings/edit',{listing})
}

module.exports.updateListing=async(req,res)=>{
    let{id}=req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params
    let listing = await Listing.findById(id).populate({path:'reviews',populate:{path:'author'}}).populate('owner')
    if(!listing){
        req.flash('flash',{type:'warning',message:'Listing Not exist!'})
        res.redirect('/listings')
    }
    res.render('listings/show',{listing})
}


module.exports.newReview=async(req,res)=>{
    let {id}=req.params
    const newReview=new Review(req.body.review)
    const listing=await Listing.findById(id)
    newReview.author=req.user
    await listing.reviews.push(newReview)
    await newReview.save()
    await listing.save()
    req.flash('flash',{type:'success',message:'New Review Added successfully!'})
    res.redirect(`/listings/${id}`) 
}

module.exports.deleteReview=async(req,res)=>{
    let{id,reviewId}=req.params
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/listings/${id}`)
}


module.exports.deleteListing=async(req,res)=>{
    let{id}=req.params
    await Listing.findByIdAndDelete(id)
    req.flash('flash',{type:'danger',message:'Listing Deleted successfully!'})
    res.redirect('/listings')
}