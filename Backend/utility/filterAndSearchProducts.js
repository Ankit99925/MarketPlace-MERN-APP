const Product = require("../models/productModel");
const mongoose = require("mongoose");

const filterAndSearchProducts = async (req, res) => {
  try {
    // Get userType from req if it exists
    const userType = req.userId ? "protected" : "public";

    // 1. Get all query parameters with defaults
    const {
      search = "", // Search in product name
      brand = "", // Search in brand name
      minPrice = 0, // Minimum price filter
      maxPrice = 1000, // Maximum price filter
      category = "", // Category filter
      subCategory = "", // SubCategory filter
      minStock = 0, // Minimum stock filter
      isFeatured, // Featured products filter
      tags = [], // Tags filter
      minRating = 0, // Minimum rating filter
      maxRating = 5, // Maximum rating filter
      sortBy = "createdAt", // Field to sort by
      sortOrder = "desc", // Sort direction
      page = 1, // Current page
      limit = 10, // Items per page
      sellerId, // Seller specific products
    } = req.query;

    // 2. Build filter object
    const filter = {};

    // 3. Text search filters (case-insensitive)
    if (search) {
      filter.productName = {
        $regex: `^${search}`,
        $options: "i", // case-insensitive
      };
    }
    if (brand) {
      filter.brand = {
        $regex: brand,
        $options: "i", // case-insensitive
      };
    }

    // 4. Exact match filters
    if (category) {
      filter.category = category;
    }
    if (subCategory) {
      filter.subCategory = subCategory;
    }

    // 5. Numerical range filters
    if (minPrice || maxPrice) {
      filter.price = {
        $gte: Number(minPrice),
        $lte: Number(maxPrice),
      };
    }

    if (minRating || maxRating) {
      filter.rating = {
        $gte: Number(minRating),
        $lte: Number(maxRating),
      };
    }

    if (minStock > 0) {
      filter.stock = { $gte: Number(minStock) };
    }

    // 6. Boolean filter
    if (isFeatured !== undefined) {
      filter.isFeatured = isFeatured === "true";
    }

    // 7. Array filter
    if (tags && tags.length > 0) {
      filter.tags = {
        $in: Array.isArray(tags) ? tags : [tags],
      };
    }

    // 8. Seller filter
    if (sellerId) {
      filter.seller = mongoose.Types.ObjectId(sellerId);
    }

    // 9. Validate sort field
    const validSortFields = [
      "productName",
      "price",
      "rating",
      "createdAt",
      "stock",
    ];

    if (!validSortFields.includes(sortBy)) {
      sortBy = "createdAt"; // Default sort
    }

    // 10. Create sort object (FIX: remove duplicate sort)
    const sort = {
      [sortBy]: sortOrder === "desc" ? -1 : 1,
    };

    // 11. Execute query with all filters
    const totalCount = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // 12. Send response
    const result = {
      success: true,
      data: {
        products,
        metadata: {
          total: totalCount,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(totalCount / limit),
          hasNextPage: page * limit < totalCount,
          hasPrevPage: page > 1,
          sortBy,
          sortOrder,
        },
      },
    };

    // If public route, send response
    // If protected route (customer/seller/admin), return data
    if (userType === "public") {
      return res.status(200).json(result);
    } else {
      return result;
    }
  } catch (error) {
    // If public route, send error response
    // If protected route, throw error for controller to handle
    if (!req.userId) {
      return res.status(500).json({
        success: false,
        error: "An error occurred while filtering products",
      });
    }
    throw error;
  }
};

module.exports = filterAndSearchProducts;
