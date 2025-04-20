const Product = require("../models/productModel");
const filterAndSearchProducts = require("../utility/filterAndSearchProducts");
exports.getAllData = async (req, res) => {
  if (Object.keys(req.query).length > 0) {
    return filterAndSearchProducts(req, res);
  }
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
