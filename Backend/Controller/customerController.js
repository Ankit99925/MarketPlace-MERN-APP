const Product = require("../models/productModel");
const User = require("../models/userModel");
const order = require("../models/order");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("orders");

    const products = await Product.find();
    res.status(200).json({
      products,
      cart: user.cart,
      orders: user.orders,
    });
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

exports.createCheckoutSession = async (req, res) => {
  const { products, finalPrice } = req.body;
  console.log("products", products);
  const subtotal = products.reduce((sum, product) => sum + product.price, 0);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      // Show each product individually
      ...products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.productName,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: 1,
      })),
      // Add the difference between finalPrice and subtotal as tax/shipping
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Tax and Shipping",
            description: "Includes 10% tax and shipping fees",
          },
          unit_amount: Math.round((finalPrice - subtotal) * 100), // Use the difference
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    ui_mode: "embedded",
    return_url:
      "http://localhost:5173/payment-result?status={CHECKOUT_SESSION_ID}",
  });

  res.send({ clientSecret: session.client_secret });
};

exports.checkPaymentResult = async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.userId;

  console.log("Session ID:", sessionId);
  console.log("User ID:", userId);
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("Session getting for checking payment result:", session);
    if (session.payment_status === "paid") {
      const user = await User.findById(userId).populate("cart");
      let totalAmount = 0;
      for (const product of user.cart) {
        totalAmount += product.price;
      }
      const orders = new order({
        items: user.cart,
        total: totalAmount,
        status: "pending",
        seller: Product.findById(user.cart).seller,
        paymentDetails: session.payment_status,
        customer: userId,
        createdAt: new Date().toLocaleString(),
      });
      await orders.save();
      user.orders.push(orders._id);
      user.cart = [];
      await user.save();
      console.log("Order created:", orders);
      res.status(200).json(orders);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
