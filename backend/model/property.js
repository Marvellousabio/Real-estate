import mongoose from "mongoose";


const propertySchema = new mongoose.Schema({
    title:String,
    description:String,
    type:String,
    category:String,
    location:String,
    price:Number,


    bedrooms:Number,
    bathrooms:Number,
    size:Number,
    images:[String],
    createdAt:{type:Date,default:Date.now},
});

const Property=mongoose.model("property", propertySchema);
export default Property;