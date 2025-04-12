const express = require("express");
const publicRouter = express.Router();

const publicController = require("../Controller/publicController");

publicRouter.get("/", publicController.getAllData);
publicRouter.get("/:category", publicController.getProductsByCategory);
module.exports = publicRouter;
