const mongoose = require("mongoose");

const connectDB = async () =>
  await mongoose
    .connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@abnb.f0nhy.mongodb.net/${process.env.MONGO_DB_DATABASE}`)
    .then(() => console.log(`MONGODB CONNECTED`))
    .catch((err) => console.log(err));

module.exports = connectDB;
