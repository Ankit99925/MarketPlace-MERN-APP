const express = require("express");
const sellerRouter = express.Router();

const sellerController = require("../Controller/sellerController");
const { upload, uploadToCloudinary } = require("../middlewares/uploadFile");
const { deleteFromCloudinary } = require("../middlewares/deleteImage");
const { editUpdateToCloudinary } = require("../middlewares/updateimage");

sellerRouter.get("/products", sellerController.getProducts);

sellerRouter.patch(
  "/editProduct/:id",
  upload.single("image"),
  editUpdateToCloudinary,
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

sellerRouter.get("/orders", sellerController.getSellerOrders);

sellerRouter.patch(
  "/updateOrderStatus/:id",
  sellerController.updateOrderStatus
);

sellerRouter.get("/profile/:id", sellerController.getSellerProfile);

sellerRouter.patch(
  "/updateProfile/:id",
  upload.single("profilePicture"),
  editUpdateToCloudinary,
  sellerController.updateSellerProfile
);

module.exports = sellerRouter;
