const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const upload = multer({ storage: multer.memoryStorage() });
const Product = require("../models/productModel");

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

  if (!req.file) {
    return next();
  }
  const product = await Product.findById(id);
  const existingImageUrl = product.imageUrl;

  const publicId = getPublicId(existingImageUrl);
  await cloudinary.uploader.destroy(publicId);

  const stream = cloudinary.uploader.upload_stream(
    { resource_type: "auto" },
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Cloudinary upload failed" });
      }

      // Attach Cloudinary URL to req object
      req.fileUrl = result.secure_url;

      next(); // Move to the next middleware/controller
    }
  );

  // Pipe file buffer to Cloudinary

  streamifier.createReadStream(req.file.buffer).pipe(stream);
};

module.exports = { upload, editUpdateToCloudinary };
