import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    //maxAge: 60 * 60 * 1000, // 1 hour
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  });

  // Set session cookie (for short-lived session)
  // res.cookie("session", "active", {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development",
  //   sameSite: "strict",
  // });
};

export default generateToken;
