const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, enum: ["Customer", "Seller"] },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order", default: [] }],
});

module.exports = mongoose.model("User", userSchema);
