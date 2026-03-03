const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,

  category: {
    type: String,
    enum: [
      "vegetables",
      "fruits",
      "dairy",
      "beverages",
      "snacks",
      "household",
      "rice_pulses"
    ]
  },

  price: Number,
  stock: Number,

  image: {
    type: String,
    required: false
  },

  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store"
  }
});

module.exports = mongoose.model("Product", productSchema);