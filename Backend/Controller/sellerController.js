const Product = require("../models/productModel");

exports.getProducts = async (req, res) => {
  // const { name, brand, price, description, category, rating,imageUrl } = req.body;

  const product = await Product.find().populate("seller", "firstName");
  console.log(product);
  res.status(200).json({ product });
};

exports.createProduct = async (req, res) => {
  try {
    const sellerId = req.userId;
    const imageUrl = req.fileUrl;
    // If image URL is not received, return an error
    if (!imageUrl) {
      return res.status(400).json({ message: "Image upload failed" });
    }
    const { productName, brand, price, description, category, rating } =
      req.body;
    const product = await Product.create({
      productName,
      brand,
      price,
      description,
      imageUrl,
      category,
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
  const newImageUrl = req.fileUrl;

  const { productName, brand, price, description, imageUrl, category, rating } =
    req.body;
  await Product.findById(id);
  if (!id) {
    res.status(404).json({ message: "Product not Found" });
  }
  const product = await Product.findByIdAndUpdate(id, {
    productName,
    brand,
    price,
    description,
    imageUrl: newImageUrl ? newImageUrl : imageUrl,
    category,
    rating,
  });
  res.status(201).json({ product, message: "Product updated Successfully" });
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
