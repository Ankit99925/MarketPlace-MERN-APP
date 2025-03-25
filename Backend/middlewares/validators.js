const { check } = require("express-validator");
// first Name Validator
const firstNameValidator = check("firstName")
  .trim()
  .notEmpty()
  .withMessage("First name is required")

  .isLength({ min: 2 })
  .withMessage("First name must be at least 2 characters long")
  .matches(/^[a-zA-Z]+$/)
  .withMessage("First name must contain only letters");

// Last Name Validator
const lastNameValidator = check("lastName")
  .trim()
  .optional()
  .isLength({ min: 2 })
  .withMessage("Last name must be at least 2 characters long")
  .matches(/^[a-zA-Z]+$/)
  .withMessage("Last name must contain only letters");

// Email Validator
const emailValidator = check("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Invalid email format")
  .normalizeEmail();

// Password Validator
const passwordValidator = check("password")
  .notEmpty()
  .withMessage("Password is required")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter")
  .matches(/\d/)
  .withMessage("Password must contain at least one number")
  .matches(/[@$!%*?&#]/)
  .withMessage("Password must contain at least one special character");

// Confirm Password Validator
const confirmPasswordValidator = check("confirmPassword")
  .notEmpty()
  .withMessage("Confirm password is required")
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  });
// User Type Validator
const userTypeValidator = check("userType")
  .notEmpty()
  .withMessage("User type is required")
  .isIn(["Customer", "Seller"])
  .withMessage("User type must be either 'Customer' or 'Seller'");

module.exports = {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  userTypeValidator,
  passwordValidator,
  confirmPasswordValidator,
};
