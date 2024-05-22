import jwt from "jsonwebtoken";

// Generate JWT
export const generateToken = (
  res,
  id,
  firstName,
  lastName,
  role,
  isVerified
) => {
  const token = jwt.sign(
    { id, firstName, lastName, role, isVerified },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 12 * 60 * 60 * 1000,
  });
  return token;
};

export const generateVerificationToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  return token;
};
