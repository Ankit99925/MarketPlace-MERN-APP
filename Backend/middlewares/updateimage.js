const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const upload = multer({ storage: multer.memoryStorage() });
const Product = require("../models/productModel");
const User = require("../models/userModel");

// Configuration
cloudinary.config({
  cloud_name: "dcnilhyik",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const getPublicId = (existingImageUrl) => {
  const parts = existingImageUrl.split("/");
  const fileName = parts[parts.length - 1]; // Get last part of URL (e.g., "abcd1234.jpg")
  const publicId = fileName.split(".")[0]; // Remove file extension
  return publicId;
};
const editUpdateToCloudinary = async (req, res, next) => {
  const { id } = req.params;
  let existingImageUrl;
  if (!req.file) {
    return next();
  }

  try {
    // Get the product to check existing image
    const product = await Product.findById(id);
    const user = await User.findById(id);
    if (product) {
      existingImageUrl = product.imageUrl;
    }
    if (user) {
      existingImageUrl = user.profilePicture;
    }
    // Only try to delete if it's a Cloudinary URL
    if (existingImageUrl && existingImageUrl.includes("cloudinary")) {
      try {
        const publicId = getPublicId(existingImageUrl);
        await cloudinary.uploader.destroy(publicId);
        console.log("Deleted old image from Cloudinary");
      } catch (deleteError) {
        console.error("Error deleting old image:", deleteError);
        // Continue even if delete fails
      }
    }
    const folder = product ? "products" : "users";

    // Upload new image
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: folder },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    req.fileUrl = uploadResult.secure_url;
    next();
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
};

module.exports = { upload, editUpdateToCloudinary };
