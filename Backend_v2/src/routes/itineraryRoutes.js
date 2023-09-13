const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authMiddleware = require("../middleware/auth");

//create empty itinerary (USER)
router.post("/itinerary", authMiddleware, async (req, res) => {
  const { location, num_of_days, title } = req.body;
  const userId = req.user.id; //access user ID from req object provided by authMiddleware

  try {
    const query = `
        INSERT INTO Itinerary (location, num_of_days, title, id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

    //sends SQL query to database, with actual values from query passed as an array
    const newItinerary = await pool.query(query, [
      location,
      num_of_days,
      title,
      userId,
    ]);

    //extract itinerary_id of the newly created itinerary from the first row. return in postman for own reference
    const itinerary_id = newItinerary.rows[0].itinerary_id;

    res.json({ itinerary_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//add activities to itinerary (USER)
router.patch("/itinerary/update", authMiddleware, async (req, res) => {
  try {
    const { activity_id, day } = req.body;
    const userId = req.user.id;

    //fetch user's latest itinerary ID from the itinerary table based on their user id
    const fetchLatestItineraryQuery = `
      SELECT itinerary_id 
      FROM itinerary 
      WHERE id = $1 
      ORDER BY itinerary_id DESC 
      LIMIT 1
    `;

    //execute query using pool.query method, passing user id as parameter
    const result = await pool.query(fetchLatestItineraryQuery, [userId]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No itinerary found for the user" });
    }

    //extract latest itinerary id
    const latestItineraryId = result.rows[0].itinerary_id;

    //insert activity into the latest itinerary, using the latest itinerary_id
    const updateQuery = `
      INSERT INTO ItineraryActivity (itinerary_id, activity_id, day)
      VALUES ($1, $2, $3)
    `;

    //execute query
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
router.delete(
  "/itinerary/delete-activity/:itineraryId/:activityId",
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { itineraryId, activityId } = req.params;

      const deleteActivityQuery = `
      DELETE FROM itineraryactivity
      WHERE itinerary_id = $1 AND activity_id = $2;
    `;

      //execute deletion with itinerary id and activity id as parameters
      const result = await pool.query(deleteActivityQuery, [
        itineraryId,
        activityId,
      ]);

      if (result.rowCount === 0) {
        return res
          .status(404)
          .json({ message: "Activity not found in itinerary" });
      }

      res.status(200).json({ message: "Activity deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the activity" });
    }
  }
);

//retrieve user's itineraries (USER)
router.get("/itineraries/user", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    //LEFT JOIN i and ia tables based on itinerary_id column as the overlap
    //LEFT JOIN ia and a tables based on activity_id column as the overlap
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
  const userId = req.user.id;
  const itineraryId = req.params.id;

  try {
    const itinerary = await pool.query(
      "SELECT * FROM itinerary WHERE id = $1 AND itinerary_id = $2",
      [userId, itineraryId]
    );

    if (itinerary.rows.length === 0) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    //delete related records in the itineraryactivity table first
    await pool.query("DELETE FROM itineraryactivity WHERE itinerary_id = $1", [
      itineraryId,
    ]);

    //then delete related records in itinerary table
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

module.exports = router;
