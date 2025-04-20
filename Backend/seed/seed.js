const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const faker = require("@faker-js/faker").faker;

const Product = require("../models/productModel");
const User = require("../models/userModel");

dotenv.config();

const MONGODB_URI =
  `mongodb+srv://admin:admin@abnb.f0nhy.mongodb.net/nursery-marketplace` ||
  "mongodb://localhost:3000/marketplace";

// Hardcoded seller ID for demo
const SELLER_ID = "67f64efbee5dc3f416d46348";

// Image pool for categories
const imageMap = {
  Plant: [
    "https://source.unsplash.com/400x300/?plant",
    "https://source.unsplash.com/400x300/?bonsai",
    "https://source.unsplash.com/400x300/?indoor-plant",
  ],
  Seed: [
    "https://source.unsplash.com/400x300/?seeds",
    "https://source.unsplash.com/400x300/?garden-seeds",
  ],
  "Plant Care": [
    "https://source.unsplash.com/400x300/?fertilizer",
    "https://source.unsplash.com/400x300/?plant-tools",
  ],
};

// Categories/Subcategories pool
const categories = [
  { category: "Plant", sub: ["Indoor", "Outdoor", "Hanging"] },
  { category: "Seed", sub: ["Flower Seeds", "Vegetable Seeds", "Herbs"] },
  {
    category: "Plant Care",
    sub: ["Fertilizers", "Pots", "Tools", "Accessories"],
  },
];

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
    // 👉 Create customers
    const customerData = [];
    for (let i = 0; i < 3; i++) {
      customerData.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: await hashPassword("customer123"),
        userType: "Customer",
        isEmailVerified: true,
        profilePicture: `https://i.pravatar.cc/150?img=${i + 10}`,
      });
    }
    await User.insertMany(customerData);

    // 👉 Create products
    const productData = [];
    for (let i = 0; i < 15; i++) {
      const categorySet = faker.helpers.arrayElement(categories);
      const category = categorySet.category;
      const subCategory = faker.helpers.arrayElement(categorySet.sub);
      const image = faker.helpers.arrayElement(imageMap[category]);

      productData.push({
        productName: faker.commerce.productName(),
        brand: faker.company.name(),
        price: faker.number.int({ min: 100, max: 1000 }),
        description: faker.commerce.productDescription(),
        imageUrl: image,
        category,
        subCategory,
        stock: faker.number.int({ min: 10, max: 100 }),
        isFeatured: faker.datatype.boolean(),
        tags: faker.lorem.words(3).split(" "),
        rating: faker.number.float({ min: 2.5, max: 5, precision: 0.1 }),
        seller: [SELLER_ID],
      });
    }

    await Product.insertMany(productData);

    console.log("✅ Seeded users and products successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    mongoose.connection.close();
  }
}

seed();
