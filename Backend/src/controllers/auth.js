const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db"); // This imports the db connection.

//registration
const register = async (req, res) => {
  try {
    // Check if user already exists using the 'pg' library
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE user = $1",
      [req.body.email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }

    // Hash the password
    const hash = await bcrypt.hash(req.body.password, 12);

    // Insert the user into the database using the 'pg' library
    const newUser = await pool.query(
      "INSERT INTO users (user, password, role) VALUES ($1, $2, $3) RETURNING id, user, role",
      [req.body.email, hash, req.body.role || "user"]
    );

    res.json({ status: "ok", msg: "user created", user: newUser.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", msg: "invalid registration" });
  }
};

// ... (rest of your code remains unchanged)

module.exports = { register, login, refresh };
