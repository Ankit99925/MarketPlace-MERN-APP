const express = require("express");
const customerRouter = express.Router();

const customerController = require("../Controller/customerController");

customerRouter.get("/data", customerController.getData);
customerRouter.post("/addToCart/:id", customerController.addToCart);
customerRouter.delete("/removeFromCart/:id", customerController.removeFromCart);
customerRouter.post("/create-checkout-session", customerController.createCheckoutSession);
customerRouter.get("/check-payment-result/:sessionId", customerController.checkPaymentResult);

module.exports = customerRouter;
