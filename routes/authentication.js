const jsonwebToken = require("jsonwebtoken");
const config = require("config");

function authentication(req, res, next) {
  const token = req.header("x-token");
  if (!token) return res.status(401).send("No Token");

  try {
    const userToken = jsonwebToken.verify(token, config.get("webTokenSalt"));
    req.user = userToken;
    console.log(userToken);
    next();
  } catch (error) {
    res.status(400).send("TokenError");
  }
}
module.exports = authentication;
