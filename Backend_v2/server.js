const express = require("express");
const pg = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRoutes = require("./src/routes/authRoutes");
const activityRoutes = require("./src/routes/activityRoutes");
const itineraryRoutes = require("./src/routes/itineraryRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5004;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, //enable cookies or authorization headers if needed
};

//middleware to parse JSON requests
app.use(express.json());
app.use(cors(corsOptions));

//api routes
app.use("/auth", authRoutes);
app.use("/api", activityRoutes);
app.use("/api", itineraryRoutes);

//rrror handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
