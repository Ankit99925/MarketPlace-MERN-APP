const express = require("express");
const sellerRouter = express.Router();

const sellerController = require("../Controller/sellerController");
const { upload, uploadToCloudinary } = require("../middlewares/uploadFile");
const { deleteFromCloudinary } = require("../middlewares/deleteImage");
const { updateToCloudinary } = require("../middlewares/updateimage");

sellerRouter.get("/products", sellerController.getProducts);

sellerRouter.patch(
  "/editProduct/:id",
  upload.single("image"),
  updateToCloudinary,
  sellerController.editProduct
);

sellerRouter.post(
  "/createProduct",
  upload.single("image"),
  uploadToCloudinary,
  sellerController.createProduct
);

sellerRouter.delete(
  "/deleteProduct/:id",
  deleteFromCloudinary,
  sellerController.deleteProduct
);

module.exports = sellerRouter;
