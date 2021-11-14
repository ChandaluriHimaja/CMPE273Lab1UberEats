const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  console.log("JWT token: ", token);

  if (!token) return res.status(401).send("Access Denied, No token provided");

  try {
    // const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    const decoded = jwt.verify(token, "1234");
    console.log("decoded: ", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
