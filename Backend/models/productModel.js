const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Plant", "Seed", "Plant Care", "Pots"],
  },
  subCategory: {
    type: String,
    required: true,
    enum: [
      "Indoor",
      "Outdoor",
      "Hanging",
      "Flower Seeds",
      "Vegetable Seeds",
      "Herbs",
      "Fertilizers",
      "Pots",
      "Tools",
      "Accessories",
    ],
  },
  stock: { type: Number, required: true },
  isFeatured: { type: Boolean, default: false },
  tags: { type: [String], default: [] },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },

  seller: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});
module.exports = mongoose.model("Product", productSchema);
