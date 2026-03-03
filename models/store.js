// models/Store.js
const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  address: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number]
  }
});

storeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Store", storeSchema);