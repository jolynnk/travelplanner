const jwt = require("jsonwebtoken");

// Middleware function to extract user ID from JWT
function authMiddleware(req, res, next) {
  // Get the JWT token from the request headers
  const token = req.headers.authorization.split(" ")[1];

  try {
    // Verify the token using your secret key
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Add the user ID and role to the request object
    req.user = {
      id: decodedToken.userId,
      user: decodedToken.user,
      role: decodedToken.role, // Include the user's role here
    };

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authMiddleware;
