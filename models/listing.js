const mongoose=require('mongoose')
const Schema=mongoose.Schema

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
    }
},{
    timestamps:true
})

const Listing = mongoose.model('Listing',listingSchema);


module.exports=Listing;