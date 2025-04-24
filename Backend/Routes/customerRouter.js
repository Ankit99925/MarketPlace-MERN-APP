const express = require("express");
const customerRouter = express.Router();

const customerController = require("../Controller/customerController");
const { upload } = require("../middlewares/uploadFile");
const { editUpdateToCloudinary } = require("../middlewares/updateimage");
customerRouter.get("/data", customerController.getData);
customerRouter.post("/addToCart/:id", customerController.addToCart);
customerRouter.delete("/removeFromCart/:id", customerController.removeFromCart);
customerRouter.post(
  "/create-checkout-session",
  customerController.createCheckoutSession
);
customerRouter.get(
  "/check-payment-result/:sessionId",
  customerController.checkPaymentResult
);
customerRouter.get("/profile", customerController.getCustomerProfile);
customerRouter.patch(
  "/profile/:id",
  upload.single("profilePicture"),
  editUpdateToCloudinary,
  customerController.updateCustomerProfile
);
module.exports = customerRouter;
