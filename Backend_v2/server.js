const express = require("express");
const pg = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRoutes = require("./src/routes/authRoutes");
const activityRoutes = require("./src/routes/activityRoutes");

const app = express();
const port = process.env.PORT || 5004;

// Middleware to parse JSON requests
app.use(express.json());

// Your API routes for registration and login will go here
app.use("/auth", authRoutes);
app.use("/api", activityRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
