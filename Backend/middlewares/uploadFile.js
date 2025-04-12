const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const upload = multer({ storage: multer.memoryStorage() });

// Configuration
cloudinary.config({
  cloud_name: "dcnilhyik",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (req, res, next) => {
  console.log(req);
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Convert buffer to readable stream and upload to Cloudinary
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
  } catch (error) {
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
};

module.exports = { upload, uploadToCloudinary };
