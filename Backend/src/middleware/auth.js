const jwt = require("jsonwebtoken");

//authorisation for users
const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      //token being decoded
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next(); //if all good, control will be passed to the next middleware
    } catch (error) {
      return res.status(401).json({
        status: "error",
        msg: "unauthorised",
      });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "forbidden" });
  }
};

//authorisation for admins
const authAdmin = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

      if (decoded.role === "admin") {
        req.decoded = decoded;
        next();
      } else {
        throw new Error(); //this Error will be caught by the below
      }
    } catch (error) {
      return res.status(401).json({
        status: "error",
        msg: "unauthorised",
      });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "forbidden" });
  }
};

module.exports = { auth, authAdmin };
