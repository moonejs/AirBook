const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Review=require('./review')
const { required } = require('joi')

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
        url:String,
        filename:String,
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
    },
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
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