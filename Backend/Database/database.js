const mongoose = require("mongoose");

const connectDB = async () =>
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log(`MONGODB CONNECTED`))
    .catch((err) => console.log(err));

module.exports = connectDB;
