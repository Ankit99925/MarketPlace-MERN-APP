const Product = require("../models/productModel");
const User = require("../models/userModel");
const order = require("../models/order");
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("orders");

    const products = await Product.find();
    res.status(200).json({ products, cart: user.cart, orders: user.orders });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addToCart = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  console.log("User ID:", userId);
  try {
    if (!id) {
      return res.status(404).json({ error: "Product not found" });
    }
    const user = await User.findById(userId);
    console.log("User:", user);
    user.cart.push(id);

    await user.save();

    return res.status(200).json(user.cart);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    if (!id) {
      return res.status(404).json({ error: "Product not found" });
    }
    const user = await User.findById(userId);
    console.log(user.cart);

    user.cart = user.cart.filter((itemid) => itemid.toString() !== id);

    await user.save();

    return res.status(200).json(user.cart);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrders = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId).populate("cart");
  let totalAmount = 0;
  for (const product of user.cart) {
    totalAmount += product.price;
  }
  const orders = new order({
    products: user.cart,
    totalAmount,
    customer: userId,
  });
  await orders.save();
  user.orders.push(orders._id);
  user.cart = [];
  await user.save();
  res.status(200).json(orders);
};
