const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

// Get all events
router.get("/", (req, res) => {
  const db = req.app.locals.db;
  const sql = "SELECT * FROM events";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ msg: "Error fetching events." });
    }
    res.json(results);
  });
});

// Create new event (protected)
router.post("/", verifyToken, (req, res) => {
  const db = req.app.locals.db;
  const {
    title,
    description,
    event_date,
    event_time,
    venue,
    participants_limit,
    category,
  } = req.body;

  if (
    !title ||
    !description ||
    !event_date ||
    !event_time ||
    !venue ||
    !participants_limit ||
    !category
  ) {
    return res.status(400).json({ msg: "Please provide all fields." });
  }

  // Extract host_id from the verified token
  const host_id = req.user.id;

  const sql = `INSERT INTO events (host_id, title, description, event_date, event_time, venue, participants_limit, category) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      host_id,
      title,
      description,
      event_date,
      event_time,
      venue,
      participants_limit,
      category,
    ],
    (err, result) => {
      if (err) {
        console.log("Database Insert Error:", err);
        return res
          .status(500)
          .json({ msg: "Something went wrong. Please try again." });
      }
      res.status(201).json({ msg: "Event created successfully" });
    }
  );
});

// Update an event (protected)
router.put("/:id", verifyToken, (req, res) => {
  const db = req.app.locals.db;
  const eventId = req.params.id;
  const {
    title,
    description,
    event_date,
    event_time,
    venue,
    participants_limit,
    category,
  } = req.body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !event_date ||
    !event_time ||
    !venue ||
    !participants_limit ||
    !category
  ) {
    return res.status(400).json({ msg: "Please provide all fields." });
  }

  // Get the user ID from the verified token
  const userId = req.user.id;

  // First, verify that the user is the host of this event
  const checkHostSql = "SELECT host_id FROM events WHERE id = ?";

  db.query(checkHostSql, [eventId], (err, results) => {
    if (err) {
      console.error("Error checking event ownership:", err);
      return res.status(500).json({ msg: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: "Event not found" });
    }

    const event = results[0];

    // Check if the current user is the host
    if (event.host_id !== userId) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to edit this event" });
    }

    // If authorized, proceed with the update
    const updateSql = `
      UPDATE events 
      SET title = ?, description = ?, event_date = ?, 
          event_time = ?, venue = ?, participants_limit = ?, category = ?
      WHERE id = ?
    `;

    db.query(
      updateSql,
      [
        title,
        description,
        event_date,
        event_time,
        venue,
        participants_limit,
        category,
        eventId,
      ],
      (updateErr, updateResult) => {
        if (updateErr) {
          console.error("Error updating event:", updateErr);
          return res.status(500).json({ msg: "Error updating event" });
        }

        if (updateResult.affectedRows === 0) {
          return res
            .status(404)
            .json({ msg: "Event not found or no changes made" });
        }

        res.json({ msg: "Event updated successfully" });
      }
    );
  });
});

// Get a single event by ID
router.get("/:id", (req, res) => {
  const db = req.app.locals.db;
  const eventId = req.params.id;

  const sql = "SELECT * FROM events WHERE id = ?";

  db.query(sql, [eventId], (err, results) => {
    if (err) {
      console.error("Error fetching event:", err);
      return res.status(500).json({ msg: "Error fetching event details." });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json(results[0]);
  });
});
module.exports = router;
