const User = require("../models/userModel");
const otpGenerator = require("otp-generator");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, userType } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword ||
      !userType
    ) {
      return res.status(400).json({
        status: "failed",
        message:
          "Please provide all the required fields or make sure your password and confirm password are the same",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
    });
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    const jwtToken = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      jwtToken,
      userType: user.userType,
      firstName: user.firstName,
      userId: user._id,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide email",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    // Send OTP to user's email
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp} It is valid for 10 minutes.`,
    };
    await sgMail.send(msg);
    res
      .cookie("otpToken", token, {
        httpOnly: false, // Must be false to be visible in Application tab
        secure: false, // Must be false for localhost
        sameSite: "lax",
        domain: "localhost", // Add this
        path: "/",
        maxAge: 10 * 60 * 1000,
      })
      .status(200)
      .json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
exports.verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const { otpToken } = req.cookies;

  try {
    if (!otp) {
      return res.status(400).json({ error: "OTP is required" });
    }
    if (!otpToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decodedToken = jwt.verify(otpToken, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { email } = decodedToken;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
    if (user.otp !== otp) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid OTP",
      });
    }
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        status: "failed",
        message: "OTP has expired",
      });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { newPassword, confirmNewPassword } = req.body;
  const { otpToken } = req.cookies;
  const decodedToken = jwt.verify(otpToken, process.env.JWT_SECRET);
  const { email } = decodedToken;
  try {
    if (!email || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide all required fields",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Passwords do not match",
      });
    }
    const user = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract names safely with fallbacks
        const firstName =
          profile.name?.givenName || profile.displayName?.split(" ")[0] || "";
        const lastName =
          profile.name?.familyName || profile.displayName?.split(" ")[1] || "";
        const email = profile.emails?.[0]?.value;

        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          user.firstName = firstName;
          user.lastName = lastName;
          user.email = email;
          user.isEmailVerified = true;
          user.profilePicture = profile.photos[0].value;
          await user.save();
          return done(null, user);
        }

        user = await User.findOne({ email: email });
        if (user) {
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }

        const newUser = await User.create({
          googleId: profile.id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          userType: "Customer",
          isEmailVerified: true,
          profilePicture: profile.photos[0].value,
        });

        return done(null, newUser);
      } catch (err) {
        console.error("Google Strategy Error:", err);
        return done(err, false);
      }
    }
  )
);

exports.googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: "http://localhost:5173/login" },
    (err, user) => {
      if (err) return next(err);
      if (!user)
        return res.redirect("http://localhost:5173/login?error=auth_failed");

      const jwtToken = jwt.sign(
        {
          userId: user._id,
          userType: user.userType,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.redirect(
        `http://localhost:5173/auth/google?jwtToken=${jwtToken}&userType=${user.userType}&firstName=${user.firstName}&lastName=${user.lastName}&profilePicture=${user.profilePicture}`
      );
    }
  )(req, res, next);
};
