const express = require("express");
const { createProduct, fetchAllProducts, fetchProductById, updateProduct } = require("../controller/Product");

const router = express.Router();

// ✅ Routes
router.post("/", createProduct)
router.get("/", fetchAllProducts)
router.get("/:id", fetchProductById)
router.patch("/:id", updateProduct)

module.exports = router;
