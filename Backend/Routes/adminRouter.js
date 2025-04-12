const express = require("express");
const adminRouter = express.Router();
const {
  getAllUsers,
  updateUserStatus,
  getAllOrders,
  updateOrderStatus,
  getAllProducts,
  updateProductStatus,
  createProduct,
  deleteProduct,
  deleteUser,
  getDashboardConfig,
  updateDashboardConfig,
  getSalesAnalytics,
  getUserAnalytics,
  getProductAnalytics,
  createUser,
  deleteOrder,
} = require("../Controller/adminController");

adminRouter.get("/users", getAllUsers);
adminRouter.patch("/users/:userId", updateUserStatus);
adminRouter.get("/orders", getAllOrders);
adminRouter.patch("/orders/:orderId", updateOrderStatus);
adminRouter.get("/products", getAllProducts);
adminRouter.patch("/products/:productId", updateProductStatus);
adminRouter.post("/products", createProduct);
adminRouter.delete("/products/:productId", deleteProduct);
adminRouter.delete("/users/:userId", deleteUser);
adminRouter.post("/createUser", createUser);
adminRouter.delete("/orders/:orderId", deleteOrder);
// adminRouter.get("/dashboard-config", getDashboardConfig);
// adminRouter.put("/dashboard-config", updateDashboardConfig);
// adminRouter.get("/analytics/sales", getSalesAnalytics);
// adminRouter.get("/analytics/users", getUserAnalytics);
// adminRouter.get("/analytics/products", getProductAnalytics);

module.exports = adminRouter;
