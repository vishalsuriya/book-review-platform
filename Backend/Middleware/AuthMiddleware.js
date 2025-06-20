const jwt = require("jsonwebtoken");
const Users = require("../Schemas/UserSchema");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.cookies && req.cookies.jwt) {
    try {
      token = req.cookies.jwt;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Users.findById(decoded.id).select("-password");
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }
      req.user = user;
      next();
    } catch (error) {
      console.error("Error in Token Verification:", error.message);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
