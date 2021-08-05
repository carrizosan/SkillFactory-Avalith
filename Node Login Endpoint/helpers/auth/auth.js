const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config/key");
/**
 * Authentication middleware
 * Verify the user token
 */
const authUser = (req, res, next) => {
  const token = req.headers["accesstoken"];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authUser };
