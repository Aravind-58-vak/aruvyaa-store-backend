const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("../routes/authRoutes");
const productRoutes = require("../routes/productRoutes");
const orderRoutes = require("../routes/orderRoutes");
const userRoutes = require("../routes/userRoutes");

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Aruvyaa Store API Running 🚀");
});

module.exports = app;