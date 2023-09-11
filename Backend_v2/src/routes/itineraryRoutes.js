const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");

//create empty itinerary (USER)
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

//remove activities from user's itinerary (USER)
// Backend route to delete an activity from an itinerary
router.delete("/itinerary/delete-activity/:itineraryId/:activityId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { itineraryId, activityId } = req.params;

    // Check if the activity belongs to the specified itinerary and the user has permissions

    // Execute a SQL DELETE statement on the itineraryactivity table
    const deleteActivityQuery = `
      DELETE FROM itineraryactivity
      WHERE itinerary_id = $1 AND activity_id = $2;
    `;

    const result = await pool.query(deleteActivityQuery, [itineraryId, activityId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Activity not found in itinerary" });
    }

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the activity" });
  }
});

//retrieve user's itineraries (USER)
router.get("/itineraries/user", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; //extracts user info from the token

    // Fetch all itineraries for the authenticated user
    const query = `
      SELECT
        i.itinerary_id,
        i.title AS itinerary_title,
        i.location AS itinerary_location,
        i.num_of_days,
        ia.activity_id,
        ia.day,
        a.activity_type_name,
        a.title AS activity_title,
        a.district AS activity_district,
        a.cost,
        a.opening_hours,
        a.image
      FROM
        itinerary i
      LEFT JOIN
        itineraryactivity ia ON i.itinerary_id = ia.itinerary_id
      LEFT JOIN
        activity a ON ia.activity_id = a.activity_id
      WHERE
        i.id = $1;
    `;
    const values = [userId];

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching user itineraries:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user itineraries." });
  }
});

//delete user's itinerary (USER)
router.delete("/itinerary/delete/:id", authMiddleware, async (req, res) => {
  const userId = req.user.id; // Extract user ID from the token
  const itineraryId = req.params.id; // Extract itinerary ID from the URL parameter

  try {
    // Check if the itinerary belongs to the authenticated user
    const itinerary = await pool.query(
      "SELECT * FROM itinerary WHERE id = $1 AND itinerary_id = $2",
      [userId, itineraryId]
    );

    if (itinerary.rows.length === 0) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Delete related records in the itineraryactivity table first
    await pool.query("DELETE FROM itineraryactivity WHERE itinerary_id = $1", [
      itineraryId,
    ]);

    // If the itinerary belongs to the user, delete it
    await pool.query("DELETE FROM itinerary WHERE itinerary_id = $1", [
      itineraryId,
    ]);

    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    console.error("Error deleting itinerary:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the itinerary" });
  }
});

//to generate secret key
// const crypto = require('crypto');

// const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(`SECRET_KEY=${secretKey}`);

module.exports = router;
