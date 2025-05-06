require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./Database/database");
const rateLimit = require("express-rate-limit");
const port = process.env.PORT || 3000;
const passport = require("passport");
const corsOptions = {
  origin: [
    "http://localhost:5173", // Development
    "http://localhost:4173", // Preview
    process.env.FRONTEND_URL, // Production
  ].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const authRouter = require("./Routes/authRouter");
const sellerRouter = require("./Routes/sellerRouter");
const customerRouter = require("./Routes/customerRouter");
const publicRouter = require("./Routes/publicRouter");
const errorController = require("./Controller/errorController");
const {
  isSeller,
  isLoggedIn,
  isCustomer,
  isAdmin,
} = require("./middlewares/auth");
const { webhook } = require("./Controller/stripeController");
const adminRouter = require("./Routes/adminRouter");

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "Too many requests, please try again  later.",
    statusCode: 429,
  })
);

const webhookRouter = express.Router();
webhookRouter.use(express.raw({ type: "application/json" }));
webhookRouter.post("/", webhook);
app.use("/webhook", webhookRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

connectDB();

app.use("/api/admin", isLoggedIn, isAdmin, adminRouter);
app.use("/api/public", publicRouter);
app.use("/api/auth", authRouter);
app.use("/api/seller", isLoggedIn, isSeller, sellerRouter);
app.use("/api/customer", isLoggedIn, isCustomer, customerRouter);

// --- Serve static files from React build ---
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// --- Catch-all: send back React's index.html for any non-API route ---
app.get("*", (req, res) => {
  console.log("Catch-all route hit for:", req.url);
  res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
});

app.use(errorController.get404);

app.listen(port, () => {
  console.log(`MarketPlace listening on port ${port}`);
});
