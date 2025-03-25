const mongoose = require("mongoose");
const MONGO_DB_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@abnb.f0nhy.mongodb.net/${process.env.MONGO_DB_DATABASE}`;

const connectDB = async () =>
  await mongoose
    .connect(MONGO_DB_URL)
    .then(() => console.log(`MONGODB CONNECTED`))
    .catch((err) => console.log(err));

module.exports = connectDB;
