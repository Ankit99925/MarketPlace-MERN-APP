const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String,required: function() {
    return !this.googleId; // Only required if not Google user
  } },
  userType: { type: String, required: true, enum: ["Customer", "Seller"] },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order", default: [] }],
  otp: { type: String },
  otpExpiry: { type: Date },
  googleId: { type: String },
  isEmailVerified: { type: Boolean, default: false },
  profilePicture: { type: String, default: "" },
  

});
userSchema.methods.isGoogleUser = function() {
  return Boolean(this.googleId);
};
module.exports = mongoose.model("User", userSchema);
