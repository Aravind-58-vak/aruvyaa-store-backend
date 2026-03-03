const Product = require("../models/ProductTemp");

// Add Product (Store Owner Only)
exports.addProduct = async (req, res) => {
  if (req.user.role !== "store_owner") {
    return res.status(403).json({ message: "Only store owners can add products" });
  }

  const { name, category, price, stock, image } = req.body;

  const product = await Product.create({
    name,
    category,
    price,
    stock,
    image,
    store: req.user._id
  });

  res.status(201).json(product);
};

// Get All Products
exports.getProducts = async (req, res) => {
  const products = await Product.find().populate("store", "name");
  res.json(products);
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, category, image } = req.body;

    const product = new Product({
      name,
      price,
      stock,
      category,
      image,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};