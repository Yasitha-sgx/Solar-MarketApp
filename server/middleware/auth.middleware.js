import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//Auth middleware
export const protect = async (req, res, next) => {
  let token;

  //Get token
  token = req.cookies.jwt;

  //Checking token validate
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select(
        "-password -verificationToken -resetToken -__v"
      );

      //Checking user is verified
      if (!user.isVerified) {
        return res
          .status(403)
          .json({ error: "Not authorized, Account is not verified" });
      }

      req.user = user;

      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Not authorized, No token" });
  }
};

//Buyer middleware
export const checkBuyerRole = (req, res, next) => {
  const user = req.user;

  // Check if user role is 'buyer'
  if (user.role === "buyer") {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "Not authorized, Access restricted to buyers only" });
  }
};

//Seller middleware
export const checkSellerRole = (req, res, next) => {
  const user = req.user;

  // Check if user role is 'seller'
  if (user.role === "seller") {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "Not authorized, Access restricted to seller only" });
  }
};
