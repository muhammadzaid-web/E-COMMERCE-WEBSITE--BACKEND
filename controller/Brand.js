const Brand = require("../models/Brand");


exports.fetchBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createBrand = async (req, res) => {
    try {
      const brand = new Brand(req.body);
      const savedBrand = await brand.save();
  
      console.log("✅ Product Created:", savedBrand);
      
      return res.status(201).json(savedBrand);
    } catch (error) {
      console.error("❌ Error creating brand:", error.message);
      return res.status(400).json({ error: error.message });
    }
  };