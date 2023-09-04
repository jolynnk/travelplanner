const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./src/config/db"); // Adjust the path as needed
const authRoutes = require("./src/routers/auth"); // Import your authentication routes
const PORT = process.env.PORT || 5004; // Use the PORT environment variable or a default port

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes); // Mount your authentication routes at '/auth'

// Start the server

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
