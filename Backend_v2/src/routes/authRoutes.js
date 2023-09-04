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
    const query = 'INSERT INTO users ("user", password) VALUES ($1, $2)';
    await pool.query(query, [user, hashedPassword]);

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

    // Generate and send a JWT token for authentication
    const token = jwt.sign({ userId: userRecord.id }, "your_secret_key", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router; // Export the router
