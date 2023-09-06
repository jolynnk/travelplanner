const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Route for creating an empty itinerary
router.post("/itinerary", async (req, res) => {
  const { location, num_of_days, title } = req.body;

  try {
    const query = `
        INSERT INTO Itinerary (location, num_of_days, title)
        VALUES ($1, $2, $3)
        RETURNING *;
        `;

    const newItinerary = await pool.query(query, [
      location,
      num_of_days,
      title,
    ]);
    const itinerary_id = newItinerary.rows[0].itinerary_id;

    res.json({ itinerary_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//add activities to itinerary (USER)
router.patch("/itinerary/update", async (req, res) => {
  try {
    const { itinerary_id, activity_id, day } = req.body;

    // Perform database update here to insert the activity into the specified itinerary
    const updateQuery = `
      INSERT INTO ItineraryActivity (itinerary_id, activity_id, day)
      VALUES ($1, $2, $3)
    `;

    // Execute the query with your PostgreSQL client
    await pool.query(updateQuery, [itinerary_id, activity_id, day]);

    res
      .status(200)
      .json({ message: "Activity added to itinerary successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "An error occurred while adding activity to the itinerary",
      });
  }
});

module.exports = router;
