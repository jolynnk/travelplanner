const jwt = require("jsonwebtoken");

//middleware function to authenticate incoming requests based on JWTs. if JWT valid, makes user information available in the request, then allowing protected routes to be accessed by authenticated users

function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1]; //get JWT token from the request headers. authorisation header contains token in the format "Bearer TOKEN_STRING", so it splits header value and takes second part (which is TOKEN_STRING)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); //verify token using secret key

    //if token successfully verified, add user ID and role to the request object
    req.user = {
      id: decodedToken.userId,
      user: decodedToken.user,
      role: decodedToken.role,
    };

    next(); //continue to next middleware/route handler
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authMiddleware;
