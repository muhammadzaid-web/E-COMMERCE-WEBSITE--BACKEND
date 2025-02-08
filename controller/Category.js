const Category = require("../models/Category");


exports.fetchCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createCategories = async (req, res) => {
    try {
      const category = new Category(req.body);
      const savedCategory = await category.save();
  
      console.log("✅ Category Created:", savedCategory);
      
      return res.status(201).json(savedCategory);
    } catch (error) {
      console.error("❌ Error creating category:", error.message);
      return res.status(400).json({ error: error.message });
    }
  };