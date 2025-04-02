const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

function verifyToken(req, res, next) {
  // Get the auth header value
  const authHeader = req.headers.authorization;

  // Check if token was provided
  if (!authHeader) {
    return res
      .status(401)
      .json({ msg: "No token provided, authorization denied" });
  }

  try {
    // Format of token: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Add user data to request
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

module.exports = verifyToken;
