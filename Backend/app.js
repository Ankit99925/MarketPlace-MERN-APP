require("dotenv").config();
const corsOptions = {
  origin: "http://localhost:5173", // replace with your frontend's origin
  credentials: true, // allows cookies and credentials to be sent with the request
  methods: ["GET", "POST", "PUT", "DELETE"], // specify the allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // specify allowed headers
};
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
const connectDB = require("./Database/database");
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

const authRouter = require("./Routes/authRouter");
const sellerRouter = require("./Routes/sellerRouter");
const customerRouter = require("./Routes/customerRouter");
const errorController = require("./Controller/errorController");
const { isSeller, isLoggedIn, isCustomer } = require("./middlewares/auth");
const { getProducts } = require("./Controller/customerController");

app.get("/", getProducts);
app.use("/api/auth", authRouter);
app.use("/api/seller", isLoggedIn, isSeller, sellerRouter);
app.use("/api/customer", isLoggedIn, isCustomer, customerRouter);
app.use(errorController.get404);

app.listen(port, () => {
  console.log(`MarketPlace listening on port ${port}`);
});
