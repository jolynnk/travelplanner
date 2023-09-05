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
    res.json(newItinerary.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});
//   try {
//     const { location, num_of_days, title } = req.body;

//     // Here, you can save this data to your database or perform other actions as needed
//     // Replace this with your database logic

//     res.status(201).json({
//       message: "Itinerary created successfully",
//       location,
//       num_of_days,
//       title,
//     });
//   } catch (error) {
//     console.error("Error creating itinerary:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating the itinerary" });
//   }
// });

module.exports = router;
