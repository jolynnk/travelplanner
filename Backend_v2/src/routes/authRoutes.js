const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router(); // Create a router instance
const pool = require("../config/db"); // Import your PostgreSQL pool configuration

// Registration route
router.post("/register", async (req, res) => {
  try {
    const { user, password } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database
    const query =
      'INSERT INTO users ("user", password, role) VALUES ($1, $2, $3)';
    await pool.query(query, [user, hashedPassword, ["user"]]); //add ", 'admin'" behind user to register as admin

    // Retrieve the user from the database again (including the role)
    const userQuery = 'SELECT * FROM users WHERE "user" = $1';
    const userResult = await pool.query(userQuery, [user]);
    const userRecord = userResult.rows[0];

    // Log the userRecord object
    console.log("userRecord:", userRecord);

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;

    // Retrieve the user from the database
    const query = 'SELECT * FROM users WHERE "user" = $1';
    const result = await pool.query(query, [user]);
    const userRecord = result.rows[0];

    if (!userRecord) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, userRecord.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Include the user's role in the JWT payload
    const tokenPayload = {
      userId: userRecord.id,
      user: userRecord.user,
      role: userRecord.role, // Include the user's role here
    };
    console.log(tokenPayload)

    // Generate and send a JWT token for authentication
    const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ id: userRecord.id, token }); //response to include token and user id
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router; // Export the router
