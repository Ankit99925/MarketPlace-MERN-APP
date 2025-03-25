const cloudinary = require("cloudinary").v2;
const Product = require("../models/productModel");

// Cloudinary Config
cloudinary.config({
  cloud_name: "dcnilhyik",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware to delete an image from Cloudinary
const deleteFromCloudinary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    const imageUrl = product.imageUrl;
    if (!imageUrl) {
      return res.status(404).json({ message: "Image url not found" });
    }
    const getPublicId = (imageUrl) => {
      const parts = imageUrl.split("/");
      const fileName = parts[parts.length - 1]; // Get last part of URL (e.g., "abcd1234.jpg")
      const publicId = fileName.split(".")[0]; // Remove file extension
      return publicId;
    };

    const publicId = getPublicId(imageUrl);

    if (!publicId) {
      return res.status(400).json({ error: "Public ID is required" });
    }

    await cloudinary.uploader.destroy(publicId);
    next(); // Move to next middleware/controller
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete image", details: error.message });
  }
};

module.exports = { deleteFromCloudinary };
