const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Import your PostgreSQL pool configuration
const checkAdmin = require("../middleware/checkAdmin");
const authMiddleware = require("../middleware/auth");
const { check } = require("express-validator");

// Get a list of all activities (USER, ADMIN)
router.get("/activities", async (req, res) => {
  try {
    const query = "SELECT * FROM Activity";
    const activities = await pool.query(query);
    res.json(activities.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Get a single activity by ID (USER, ADMIN)
router.get("/activities/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM Activity WHERE activity_id = $1";
    const activity = await pool.query(query, [id]);

    if (activity.rows.length === 0) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.json(activity.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Create a new activity (ADMIN)
router.post("/activities", authMiddleware, checkAdmin, async (req, res) => {
  const {
    title,
    description,
    district,
    opening_hours,
    address,
    ratings,
    activity_type_name,
    cost,
    image,
  } = req.body;

  try {
    const query = `
        INSERT INTO Activity (title, description, district, opening_hours, address, ratings, activity_type_name, cost, image)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
      `;

    const newActivity = await pool.query(query, [
      title,
      description,
      district,
      opening_hours,
      address,
      ratings,
      activity_type_name,
      cost,
      image,
    ]);
    res.json(newActivity.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Update an existing activity by ID (ADMIN)
router.patch("/activities/:id", authMiddleware, checkAdmin, async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    district,
    opening_hours,
    address,
    ratings,
    activity_type_name,
    cost,
    image,
  } = req.body;

  try {
    const query = `
        UPDATE Activity
        SET title = $1, description = $2, district = $3, opening_hours = $4, address = $5, ratings = $6, activity_type_name = $7, cost = $8, image = $9
        WHERE activity_id = $10
        RETURNING *;
      `;

    const updatedActivity = await pool.query(query, [
      title,
      description,
      district,
      opening_hours,
      address,
      ratings,
      activity_type_name,
      cost,
      image,
      id,
    ]);

    if (updatedActivity.rows.length === 0) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.json(updatedActivity.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Delete an activity by ID (USER, ADMIN)
router.delete("/activities/:id", authMiddleware, checkAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    // Step 1: Delete records from itineraryactivity
    const deleteItineraryActivityQuery =
      "DELETE FROM itineraryactivity WHERE activity_id = $1";
    await pool.query(deleteItineraryActivityQuery, [id]);

    // Step 2: Delete the activity record from the activity table
    const deleteActivityQuery =
      "DELETE FROM activity WHERE activity_id = $1 RETURNING *";
    const deletedActivity = await pool.query(deleteActivityQuery, [id]);

    if (deletedActivity.rows.length === 0) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
