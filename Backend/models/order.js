const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      priceAtPurchase: Number,
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // for seller dashboards
  paymentDetails: Object,
  createdAt: Date,
});
module.exports = mongoose.model("order", OrderSchema);
