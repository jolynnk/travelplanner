const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");

// Route for creating an empty itinerary (USER)
router.post("/itinerary", async (req, res) => {
  const { location, num_of_days, title } = req.body;

  try {
    // Check if the Authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    // Split and process the Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      // Debug statements to print the token and secret key
      console.log("Token:", token);
      console.log("Secret Key:", process.env.SECRET_KEY);

      // Verify and decode the token using your SECRET_KEY from .env
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      // Extract the user ID from the decoded token
      const userId = decodedToken.userId;

      //use userId in SQL query to insert into the Itinerary table
      const query = `
        INSERT INTO Itinerary (location, num_of_days, title, id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      const newItinerary = await pool.query(query, [
        location,
        num_of_days,
        title,
        userId,
      ]);

      const itinerary_id = newItinerary.rows[0].itinerary_id;

      res.json({ itinerary_id });
    } else {
      res.status(401).json({ error: "Invalid Authorization header format" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//add activities to itinerary (USER)
router.patch("/itinerary/update", authMiddleware, async (req, res) => {
  try {
    const { activity_id, day } = req.body;
    const userId = req.user.id; // Assuming you have middleware that extracts user info from the token

    // Fetch the user's latest itinerary ID from the itinerary table
    const fetchLatestItineraryQuery = `
      SELECT itinerary_id 
      FROM itinerary 
      WHERE id = $1 
      ORDER BY itinerary_id DESC 
      LIMIT 1
    `;

    const result = await pool.query(fetchLatestItineraryQuery, [userId]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No itinerary found for the user" });
    }

    const latestItineraryId = result.rows[0].itinerary_id;

    // Perform database update to insert the activity into the latest itinerary
    const updateQuery = `
      INSERT INTO ItineraryActivity (itinerary_id, activity_id, day)
      VALUES ($1, $2, $3)
    `;

    // Execute the query with your PostgreSQL client
    await pool.query(updateQuery, [latestItineraryId, activity_id, day]);

    res
      .status(200)
      .json({ message: "Activity added to itinerary successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while adding activity to the itinerary",
    });
  }
});

//retrieve user's itinerary
router.get("/itinerary/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const query = "SELECT * FROM itinerary WHERE id = $1";
    const values = [id];

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching user itineraries:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user itineraries." });
  }
});

//to generate secret key
// const crypto = require('crypto');

// const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(`SECRET_KEY=${secretKey}`);

module.exports = router;
