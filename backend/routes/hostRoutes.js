const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

// Get all hosts
router.get("/", (req, res) => {
  const db = req.app.locals.db;
  const sql = "SELECT * FROM hosts";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching hosts:", err);
      return res.status(500).json({ msg: "Error fetching hosts." });
    }
    res.json(results);
  });
});

router.get("/events", (req, res) => {
  const db = req.app.locals.db;

  // Query to get event details, host ID, and count of registered guests per event
  const sql = `
    SELECT e.event_id, e.title, e.description, e.event_date, e.event_time, e.venue, 
           e.participants_limit, e.category, e.image_url, e.host_id,
           COUNT(ea.guest_id) AS total_guests
    FROM events e
    LEFT JOIN eventapproval ea ON e.event_id = ea.event_id
    GROUP BY e.event_id, e.title, e.description, e.event_date, e.event_time, 
             e.venue, e.participants_limit, e.category, e.image_url, e.host_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching event bookings:", err);
      return res.status(500).json({ msg: "Error fetching event bookings." });
    }

    console.log("Event Bookings with Guest Count:", results);
    res.json(results);
  });
});

// Get host by ID
router.get("/:id", (req, res) => {
  const db = req.app.locals.db;
  const hostId = req.params.id;

  // Validate that ID is a number
  if (isNaN(hostId)) {
    return res.status(400).json({ msg: "Invalid host ID format" });
  }

  const sql =
    "SELECT host_id, fullname, email, department, phone_number FROM hosts WHERE host_id = ?";

  db.query(sql, [hostId], (err, results) => {
    if (err) {
      console.error("Error fetching host details:", err);
      return res.status(500).json({ msg: "Error fetching host details." });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: "Host not found" });
    }

    // Return host details (excluding password)
    res.json(results[0]);
  });
});

// Host dashboard route (protected)
router.get("/dashboard", verifyToken, (req, res) => {
  res
    .status(200)
    .json({ msg: "Welcome to the Host Dashboard", user: req.user });
});

module.exports = router;
