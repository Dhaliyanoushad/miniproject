const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

// Get all guests (excluding sensitive data)
router.get("/", (req, res) => {
  const db = req.app.locals.db;
  const sql =
    "SELECT guest_id, full_name, email,password, college_name, student_id FROM guests";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching guests:", err);
      return res.status(500).json({ msg: "Error fetching guests." });
    }
    res.json(results);
  });
});

// Guest dashboard route (protected)
router.get("/dashboard", verifyToken, (req, res) => {
  res
    .status(200)
    .json({ msg: "Welcome to the Guest Dashboard", user: req.user });
});

router.get("/totalguests", (req, res) => {
  const db = req.app.locals.db;

  const sql = "SELECT COUNT(*) AS total_guests FROM guests";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching total guests:", err);
      return res.status(500).json({ msg: "Error fetching total guests." });
    }

    res.json({ total_guests: results[0].total_guests });
  });
});

// Get guest by ID
router.get("/:id", (req, res) => {
  const db = req.app.locals.db;
  const guestId = req.params.id;

  // Validate that ID is a number
  if (isNaN(guestId)) {
    return res.status(400).json({ msg: "Invalid guest ID format" });
  }

  const sql =
    "SELECT guest_id, full_name, email, college_name, student_id FROM guests WHERE guest_id = ?";

  db.query(sql, [guestId], (err, results) => {
    if (err) {
      console.error("Error fetching guest details:", err);
      return res.status(500).json({ msg: "Error fetching guest details." });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: "Guest not found" });
    }

    res.json(results[0]);
  });
});
module.exports = router;
