import express from "express";
import property from "../model/property.js";

const router = express.Router();

// GET with filters
router.get("/", async (req, res) => {
  try {
    const { category, type, location, minPrice, maxPrice } = req.query;

    const query = {};

    if (category) query.category = category;
    if (type) query.type = type;
    if (location) query.location = new RegExp(location, "i");
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const properties = await property.find(query).sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new property
router.post("/", async (req, res) => {
  try {
    const newProperty = new property(req.body);
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
