const { Product } = require('../models/Product');
const mongoose = require('mongoose');

// ✅ Create Product
const createProduct = async (req, res) => {
  // Generate new ObjectId
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    ...req.body
  });
  
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

// ✅ Fetch All Products (with filters)
const fetchAllProducts = async (req, res) => {
  try {
    let query = Product.find({});
    let totalProductsQuery = Product.find({});

    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalProductsQuery = totalProductsQuery.find({ category: req.query.category });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
    }
    if (req.query._sort && req.query._order) {
      const sortField = req.query._sort;
      const sortOrder = req.query._order === "desc" ? -1 : 1;
      query = query.sort({ [sortField]: sortOrder });
    }

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit);
      const page = parseInt(req.query._page);
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    // ✅ Execute Queries
    const totalDocs = await totalProductsQuery.countDocuments(); // Fix total count
    console.log("✅ Total Products:", totalDocs);

    const docs = await query.exec();
    console.log("✅ Products Fetched:", docs.length);

    // ✅ Set total count in response headers
    res.set("X-Total-Count", totalDocs);
    
    return res.status(200).json(docs);
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

const fetchProductById = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
try{
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(product);
   }catch(err){
    res.status(400).json(err);
}
}

module.exports = { createProduct, fetchAllProducts, fetchProductById , updateProduct};