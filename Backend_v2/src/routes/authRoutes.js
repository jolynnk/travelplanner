const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const pool = require("../config/db");

//chatGPT ref: how to faciliate registration and login via PERN
//registration
router.post("/register", async (req, res) => {
  try {
    const { user, password } = req.body;

    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //insert user into database
    const query =
      'INSERT INTO users ("user", password, role) VALUES ($1, $2, $3)';
    await pool.query(query, [user, hashedPassword, ["user"]]);

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;

    //retrieve the user from the database
    const query = 'SELECT * FROM users WHERE "user" = $1'; //sql code
    const result = await pool.query(query, [user]); //execute sql code with user as parameter
    const userRecord = result.rows[0];

    if (!userRecord) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    //compare provided password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, userRecord.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    //include user role in JWT payload
    const tokenPayload = {
      userId: userRecord.id,
      user: userRecord.user,
      role: userRecord.role,
    };

    //generate and send JWT token for authentication
    const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ id: userRecord.id, token }); //response to include token and user id
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;