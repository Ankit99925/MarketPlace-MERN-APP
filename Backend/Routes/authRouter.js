const express = require("express");

const { validationResult } = require("express-validator");

const validationResultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
const {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
  userTypeValidator,
} = require("../middlewares/validators");

const authRouter = express.Router();
const authController = require("../Controller/authController");

authRouter.post(
  "/signup",
  [
    firstNameValidator,
    lastNameValidator,
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
    userTypeValidator,
  ],
  validationResultHandler,
  authController.signup
);
authRouter.post(
  "/login",
  [emailValidator, passwordValidator],

  authController.login
);
// authRouter.post("/head", readAuthToken);
authRouter.post("/forgotPassword", authController.forgotPassword);
authRouter.post("/resetPassword", authController.resetPassword);
authRouter.post("/verifyOtp", authController.verifyOtp);
authRouter.get("/googleLogin", authController.googleLogin);
authRouter.get("/google/callback", authController.googleAuthCallback);
module.exports = authRouter;
