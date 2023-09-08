// Middleware to check if the user is an admin
const checkAdmin = (req, res, next) => {
  const user = req.user; // Assuming you have middleware to extract user info from the token

  // Log user information and role
  console.log("req.user:", req.user);
  console.log("user.role:", user.role);

  if (user && user.role.includes('admin')) {
    // User has the 'admin' role, allow them to proceed
    next();
  } else {
    // User doesn't have the 'admin' role, return an unauthorized error
    res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports = checkAdmin;
