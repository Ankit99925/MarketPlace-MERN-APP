const Product = require("../models/productModel");
const User = require("../models/userModel");
const order = require("../models/order");
const filterAndSearchProducts = require("../utility/filterAndSearchProducts");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("orders");

    let productsData;
    if (Object.keys(req.query).length > 0) {
      productsData = await filterAndSearchProducts(req, res); // Will return data
    } else {
      const products = await Product.find();
      productsData = {
        success: true,
        data: {
          products,
          metadata: {
            total: products.length,
            page: 1,
            limit: products.length,
            totalPages: 1,
          },
        },
      };
    }

    // Add user-specific data to the response
    res.status(200).json({
      success: true,
      data: {
        ...productsData.data,
        cart: user.cart,
        orders: user.orders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.addToCart = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    if (!id) {
      return res.status(404).json({ error: "Product not found" });
    }
    const user = await User.findById(userId);
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

    user.cart = user.cart.filter((itemid) => itemid.toString() !== id);

    await user.save();

    return res.status(200).json(user.cart);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createCheckoutSession = async (req, res) => {
  const { products, finalPrice } = req.body;
  const subtotal = products.reduce((sum, product) => sum + product.price, 0);

  // Create URLs for Stripe redirects
  const successUrl = `${process.env.FRONTEND_URL}/index.html?status=success&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.FRONTEND_URL}/index.html?status=canceled`;

  try {
    const session = await stripe.checkout.sessions.create({
      metadata: {
        finalPrice: finalPrice.toString(),
      },
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
      // Use the URLs that are working in production
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    // Return the session ID
    res.send({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

exports.checkPaymentResult = async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.userId;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const finalPrice = session.metadata.finalPrice
      ? parseFloat(session.metadata.finalPrice)
      : null;

    if (session.payment_status === "paid") {
      const user = await User.findById(userId).populate("cart");
      let totalAmount = 0;
      for (const product of user.cart) {
        totalAmount += product.price;
      }
      const items = user.cart.map((product) => ({
        product: product._id,
        quantity: 1,
        priceAtPurchase: product.price,
      }));
      const orders = new order({
        items: items,
        total: finalPrice,
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
      res.status(200).json(orders);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCustomerProfile = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  res.status(200).json(user);
};

exports.updateCustomerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const imageUrl = req.fileUrl; // Get the uploaded image URL
    const { firstName, lastName, email } = req.body;

    const updateData = {
      firstName,
      lastName,
      email,
    };

    // Only update profilePicture if a new image was uploaded
    if (imageUrl) {
      updateData.profilePicture = imageUrl;
    }

    const profile = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return updated document
    );

    res.status(200).json({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      userType: profile.userType,
      profilePicture: profile.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
