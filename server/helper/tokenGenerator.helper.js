import jwt from "jsonwebtoken";

// Generate JWT
export const generateToken = (res, id, role, isVerified) => {
  const token = jwt.sign({ id, role, isVerified }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 12 * 60 * 60 * 1000,
  });
};

export const generateVerificationToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  return token;
};
