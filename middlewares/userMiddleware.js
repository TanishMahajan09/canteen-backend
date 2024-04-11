const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/jwt");

function userMiddleware(req, res, next) {
  let token = req.headers.authorization;
  let response = jwt.verify(token, JWT_SECRET);
  if (response.userId) {
    req.userId = response.userId;
    next();
  } else {
    return res.json({
      msg: "Invalid auth token",
    });
  }
}

module.exports = userMiddleware;
