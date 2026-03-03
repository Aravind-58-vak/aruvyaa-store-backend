const express = require("express");
const { addProduct, getProducts, createProduct, updateProduct } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addProduct);
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);

module.exports = router;