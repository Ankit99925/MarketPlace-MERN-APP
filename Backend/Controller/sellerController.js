const Product = require("../models/productModel");
const Order = require("../models/order");
const User = require("../models/userModel");
exports.getProducts = async (req, res) => {
  // const { name, brand, price, description, category, rating,imageUrl } = req.body;

  const product = await Product.find().populate("seller", "firstName");
  res.status(200).json({ product });
};

exports.getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.userId;

    const orders = await Order.find()
      .populate("customer", "firstName lastName email")
      .populate({
        path: "items.product",
        model: "Product",
      });

    // // Filter orders that have products from this seller
    const sellerOrders = orders.filter((order) =>
      order.items.some(
        (item) =>
          item.product &&
          item.product.seller &&
          item.product.seller.toString() === sellerId
      )
    );

    res.status(200).json({ orders: sellerOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  order.status = status;
  await order.save();
  res.status(200).json({ message: "Order status updated", order });
};

exports.createProduct = async (req, res) => {
  try {
    const sellerId = req.userId;
    const imageUrl = req.fileUrl;
    // If image URL is not received, return an error
    if (!imageUrl) {
      return res.status(400).json({ message: "Image upload failed" });
    }
    const {
      productName,
      brand,
      price,
      description,
      category,
      rating,
      subCategory,
      stock,
      isFeatured,
      tags,
    } = req.body;
    const product = await Product.create({
      productName,
      brand,
      price,
      description,
      stock,
      isFeatured,
      tags,
      imageUrl,
      category,
      subCategory,
      rating,
      seller: sellerId,
    });
    res.status(201).json({ message: "Product Created", product });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.editProduct = async (req, res) => {
  const { id } = req.params;

  let newImageUrl;
  // Handle file upload
  if (req.file) {
    newImageUrl = req.fileUrl;
  }

  // Destructure required fields from req.body
  const {
    productName,
    brand,
    price,
    stock,
    description,
    imageUrl,
    category,
    subCategory,
    rating,
    isFeatured,
    tags,
  } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not Found" });
    }

    // Parse tags if it's a JSON string
    let parsedTags = tags;
    if (typeof tags === "string") {
      try {
        parsedTags = JSON.parse(tags);
      } catch (e) {
        console.error("Error parsing tags:", e);
        // If parsing fails, keep the original value
      }
    }

    // Create update object with all fields
    const updateData = {
      productName,
      brand,
      price,
      stock,
      description,
      imageUrl: newImageUrl || imageUrl,
      category,
      subCategory,
      rating,
      isFeatured: isFeatured === "true" || isFeatured === true,
      tags: parsedTags,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );

    res.status(201).json({
      product: updatedProduct,
      message: "Product updated Successfully",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not Found" });
  }
  await Product.deleteOne({ _id: id });
  res.status(200).json({ message: "Product deleted Successfully" });
};

exports.getSellerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID before querying
    if (!id || id === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID provided",
      });
    }

    const profile = await User.findById(id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    res.status(200).json({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      userType: profile.userType,
      profilePicture: profile.profilePicture,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
      error: error.message,
    });
  }
};

exports.updateSellerProfile = async (req, res) => {
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
