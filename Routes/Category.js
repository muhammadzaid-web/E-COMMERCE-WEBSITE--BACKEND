const express = require("express");

const router = express.Router();

const {fetchCategories, createCategories} = require("../controller/Category");

router.get("/",fetchCategories).post("/",createCategories);

module.exports = router;