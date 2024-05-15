import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { isValidEmail, isValidPassword } from "../helper/validation.helper.js";
import {
  generateToken,
  generateVerificationToken,
} from "../helper/tokenGenerator.helper.js";
import { sendEmail } from "../helper/sendMail.helper.js";

// @desc    Register new user
// @route   POST /api/users/sign-up
// @access  Public
export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    //Checking if values is empty
    if (!firstName || !lastName || !email || !phone || !password || !role) {
      return res.status(400).json({ error: "*All fields are required!" });
    }

    // Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    //Validate password
    if (!isValidPassword(password)) {
      return res.status(400).json({
        error:
          "Invalid password. It must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
      });
    }

    //Checking if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ error: "User Already registered" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
    });
    await newUser.save();

    if (newUser) {
      const verificationToken = generateVerificationToken(res, newUser._id);
      newUser.verificationToken = verificationToken;
      await newUser.save();

      //Send verification email
      const emailSubject = "SolarMarket - Email Verification";
      const emailText = `Thank you for signing up! To complete your registration.`;
      const emailHtml = `<html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #FFF8F1;
                  ;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 50px auto;
                  background-color: #fff;
                  padding: 30px;
                  border-radius: 8px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #E45416;
                  text-align: center;
              }
              p {
                  color: #333;
                  font-size: 16px;
                  line-height: 1.6;
                  text-align: center;
              }
              .btn-container {
                  text-align: center;
                  margin-top: 20px;
              }
              .btn {
                  display: inline-block;
                  background-color: #E45416;
                  text-decoration: none;
                  color: #fff !important;
                  padding: 8px 24px 8px 24px;
                  border-radius: 37px; 
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Email Verification</h1>
              <p>Thank you for signing up! To complete your registration, please click the button below to verify your email address:</p>
              <div class="btn-container">
                  <a href="${process.env.PUBLIC_FRONTEND}/verify/${verificationToken}" class="btn">Verify Email</a>
              </div>
              <p>If you did not sign up for this account, you can safely ignore this email.</p>
          </div>
      </body>
      </html>`;

      const messageId = await sendEmail(
        email,
        emailSubject,
        emailText,
        emailHtml
      );

      if (messageId) {
        res
          .status(200)
          .json({ message: "Verification link sent to the email" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    Verify email
// @route   POST /api/users/verify-email
// @access  Public
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    // Decode the verification token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: "Invalid token!" });
    }

    // Find the user by token payload (userId)
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.verificationToken !== token) {
      return res.status(401).json({ error: "Invalid token!" });
    }

    // Update user's verification status
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/sign-in
// @access  Public
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //Checking if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User doesn't exists" });
    }

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ error: "Unauthorized! Please verify your account first." });
    }

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id, user.role, user.isVerified),
        res.json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          isVerified: user.isVerified,
          role: user.role,
        });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    Forgot password
// @route   POST /api/users/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //Checking if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ error: "Please verify your account first." });
    }

    if (user) {
      const resetToken = generateVerificationToken(res, user._id);
      user.resetToken = resetToken;
      await user.save();

      //Send verification email
      const emailSubject = "Reset Password";
      const emailText = `Please click on the following link to reset your password: ${process.env.PUBLIC_FRONTEND}/reset-password/${resetToken}`;
      const emailHtml = `<html>
          <head>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #FFF8F1;
                      ;
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      max-width: 600px;
                      margin: 50px auto;
                      background-color: #fff;
                      padding: 30px;
                      border-radius: 8px;
                      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                  }
                  h1 {
                      color: #E45416;
                      text-align: center;
                  }
                  p {
                      color: #333;
                      font-size: 16px;
                      line-height: 1.6;
                      text-align: center;
                  }
                  .btn-container {
                      text-align: center;
                      margin-top: 20px;
                  }
                  .btn {
                      display: inline-block;
                      background-color: #E45416;
                      text-decoration: none;
                      color: #fff !important;
                      padding: 8px 24px 8px 24px;
                      border-radius: 37px; 
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>Reset Your Password</h1>
                  <p>Please click on the button below to reset your password:</p>
                  <div class="btn-container">
                      <a href="${process.env.PUBLIC_FRONTEND}/reset-password/${resetToken}" class="btn">Reset Password</a>
                  </div>
                  <p>If you did not request to reset password, you can safely ignore this email.</p>
              </div>
          </body>
          </html>`;

      const messageId = await sendEmail(
        email,
        emailSubject,
        emailText,
        emailHtml
      );
      if (messageId) {
        res
          .status(200)
          .json({ message: "Reset password link sent to your email." });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    Reset password
// @route   POST /api/users/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Decode the verification token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: "Invalid token!" });
    }

    // Find the user by token payload (userId)
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.resetToken !== token) {
      return res.status(401).json({ error: "Invalid token!" });
    }

    //Validate password
    if (!isValidPassword(password)) {
      return res.status(400).json({
        error:
          "Invalid password. It must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
      });
    }

    user.password = password;
    user.resetToken = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
