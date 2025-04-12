const jwtToken = require("jsonwebtoken");
exports.isLoggedIn = (req, res, next) => {
  console.log("token from req: ", req.headers.authorization);
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { userId, userType } = jwtToken.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    req.userType = userType;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

exports.isSeller = (req, res, next) => {
  if (req.userType !== "Seller") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

exports.isCustomer = (req, res, next) => {
  if (req.userType !== "Customer") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.userType !== "Admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};
