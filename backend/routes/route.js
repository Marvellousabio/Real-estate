import express from "express";
import Property from "../model/property.js";

const router = express.Router();

// GET /api/properties with filters + sorting
router.get("/", async (req, res) => {
  try {
    const {
      category,
      propertyType,
      location,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      minSize,
      maxSize,
      search,
      sortBy
    } = req.query;

    let query = {};

    // Category mapping
    if (category === "buy") query.status = "for-sale";
    if (category === "rent") query.status = "for-rent";
    if (category === "sell") query.status = "for-sale";

    // Property type
    if (propertyType) query.type = new RegExp(propertyType, "i");

    // Location
    if (location) query.location = new RegExp(location, "i");

    // Price (use rentPrice for rent, price otherwise)
    if (minPrice || maxPrice) {
      const priceField = category === "rent" ? "rentPrice" : "price";
      query[priceField] = {};
      if (minPrice) query[priceField].$gte = parseFloat(minPrice);
      if (maxPrice) query[priceField].$lte = parseFloat(maxPrice);
    }

    // Bedrooms & Bathrooms
    if (bedrooms) query.bedrooms = { $gte: parseInt(bedrooms) };
    if (bathrooms) query.bathrooms = { $gte: parseInt(bathrooms) };

    // Size
    if (minSize || maxSize) {
      query.size = {};
      if (minSize) query.size.$gte = parseFloat(minSize);
      if (maxSize) query.size.$lte = parseFloat(maxSize);
    }

    // Search across multiple fields
    if (search) {
      query.$or = [
        { type: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { location: new RegExp(search, "i") },
      ];
    }

    // Sorting
    let sort = {};
    switch (sortBy) {
      case "price-low":
        sort[category === "rent" ? "rentPrice" : "price"] = 1;
        break;
      case "price-high":
        sort[category === "rent" ? "rentPrice" : "price"] = -1;
        break;
      case "size-large":
        sort.size = -1;
        break;
      case "size-small":
        sort.size = 1;
        break;
      case "bedrooms":
        sort.bedrooms = -1;
        break;
      default:
        sort.createdAt = -1; // newest first
    }

    const properties = await Property.find(query).sort(sort);
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching properties" });
  }
});

// POST /api/properties
router.post("/", async (req, res) => {
  try {
    const newProperty = new Property({
      ...req.body,
      images: req.body.images || [], 
    });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
