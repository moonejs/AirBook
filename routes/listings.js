const express=require('express')
const router=express.Router();
const multer=require('multer')
const {storage}=require('../cloudConfig')
const upload=multer({storage})


const wrapAsync=require('../utils/wrapAsync')
const {isLoggedIn, isOwner,validateListing,validateReview}=require('../middelware')
const listingController=require('../controllers/listings')



router.route('/')
.get(wrapAsync(listingController.index))

router.route('/new')
.get(isLoggedIn,listingController.newListingForm)
.post(validateListing,upload.single('listing[image]'),wrapAsync(listingController.newListingCreate))


router.route('/:id/edit')
.get(isLoggedIn,isOwner,wrapAsync(listingController.editListingForm))
.put(isLoggedIn,validateListing,isOwner,upload.single('listing[image]'),wrapAsync(listingController.updateListing))

router.route('/:id')
.get(wrapAsync(listingController.showListing))

router.route('/:id/reviews')
.post(isLoggedIn,validateReview,wrapAsync(listingController.newReview))

router.route('/:id/reviews/:reviewId')
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteReview))

router.delete('/:id',isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))


module.exports=router;