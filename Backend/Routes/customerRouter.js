const express = require("express");
const customerRouter = express.Router();

const customerController = require("../Controller/customerController");

customerRouter.get("/data", customerController.getData);
customerRouter.post("/addToCart/:id", customerController.addToCart);
customerRouter.delete("/removeFromCart/:id", customerController.removeFromCart);
customerRouter.post("/placeOrders", customerController.getOrders);

module.exports = customerRouter;
