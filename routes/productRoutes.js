const express = require("express");
const router = express.Router();

const Product = require("../models/ProductModel");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Product Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;