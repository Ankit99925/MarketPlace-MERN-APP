const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
};

exports.updateUserStatus = async (req, res) => {
  const { userId, status } = req.body;
  const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
  res.status(200).json({ user });
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(200).json({ orders });
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  res.status(200).json({ order });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
};

exports.updateProductStatus = async (req, res) => {
  const { productId, status } = req.body;
  const product = await Product.findByIdAndUpdate(
    productId,
    { status },
    { new: true }
  );
  res.status(200).json({ product });
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, category, image } = req.body;
  const product = await Product.create({
    name,
    description,
    price,
    stock,
    category,
    image,
  });
  res.status(201).json({ product });
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  await Product.findByIdAndDelete(productId);
  res.status(204).json({ message: "Product deleted successfully" });
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId);
  res.status(204).json({ message: "User deleted successfully" });
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  res.status(201).json({ user });
};

exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  await Order.findByIdAndDelete(orderId);
  res.status(204).json({ message: "Order deleted successfully" });
};
