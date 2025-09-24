const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Review=require('./review')

const listingSchema=new Schema({
    title:{
        type:String,
        required:[true,'A listing must have a title.']
    },
    description:{
        type:String,
        required:[true,'A listing must have a description.']
    },
    image:{
        type:String,
        set: (v) => v==="" ? "https://placehold.co/600x400/EEE/31343C?text=Property+Image" : v,
        default: 'https://placehold.co/600x400/EEE/31343C?text=Property+Image'
    },
    price:{
        type:Number,
        required:[true,'A listing must have a price per night.']
    },
    location:{
        type:String,
        required:[true,'A listing must specify the country.']
    },
    country:{
        type:String,
        required:[true,'A listing must specify the country.']
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }

},{
    timestamps:true
})

listingSchema.post('findOneAndDelete',async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in :listing.reviews}})
    }
})

const Listing = mongoose.model('Listing',listingSchema)

module.exports=Listing;