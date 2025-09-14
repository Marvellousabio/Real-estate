import mongoose from "mongoose";


const propertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  type: { type: String, required: true, trim: true },     // apartment, duplex, etc.
  category: { type: String, required: true, enum: [ "rent", "sell"] },
  location: { type: String, required: true, index: true },
  price: { type: Number, required: true, min: 0 },

  bedrooms: { type: Number, min: 0 },
  bathrooms: { type: Number, min: 0 },
  size: { type: Number, min: 0 },

  images: { type: [String], default: [] },

  createdAt: { type: Date, default: Date.now },
});


const Property=mongoose.model("property", propertySchema);
export default Property;