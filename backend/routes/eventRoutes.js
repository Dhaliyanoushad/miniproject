const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

// Get all events
router.get("/", (req, res) => {
  const db = req.app.locals.db;

  // Fetch all events
  const eventSql = "SELECT * FROM events";

  db.query(eventSql, (err, events) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ msg: "Error fetching events." });
    }

    if (events.length === 0) return res.json([]); // No events found

    // Fetch pending guests for each event
    const pendingGuestSql = `
      SELECT ea.event_id,ea.id, g.guest_id, g.full_name
      FROM EventApproval ea
      JOIN guests g ON ea.guest_id = g.guest_id
      WHERE ea.booking_status = 'Pending'
    `;

    db.query(pendingGuestSql, (err, pendingGuests) => {
      if (err) {
        console.error("Error fetching pending guests:", err);
        return res.status(500).json({ msg: "Error fetching pending guests." });
      }

      // Group guests by event_id
      const eventMap = events.map((event) => ({
        ...event,
        pending_guests: pendingGuests
          .filter((guest) => guest.event_id === event.event_id)
          .map((guest) => ({
            id: guest.id,
            guest_id: guest.guest_id,
            name: guest.full_name,
          })),
      }));

      res.json(eventMap);
    });
  });
});

// Create a new event (protected)
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

  const sql = `
    INSERT INTO events (host_id, title, description, event_date, event_time, venue, participants_limit, category) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

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
router.put("/:event_id", verifyToken, (req, res) => {
  const db = req.app.locals.db;
  const eventId = req.params.event_id;
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

  const userId = req.user.id;

  // Verify that the user is the host of this event
  const checkHostSql = "SELECT host_id FROM events WHERE event_id = ?";

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
      WHERE event_id = ?
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
router.get("/:event_id", (req, res) => {
  const db = req.app.locals.db;
  const eventId = req.params.event_id;

  const sql = "SELECT * FROM events WHERE event_id = ?";

  db.query(sql, [eventId], (err, results) => {
    if (err) {
      console.error("Error fetching event:", err);
      return res.status(500).json({ msg: "Error fetching event details." });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json({ event: results[0] });
  });
});

// Update Booking Status (protected)
router.post("/updateBookingStatus", verifyToken, (req, res) => {
  const db = req.app.locals.db;
  const { id, booking_status } = req.body;

  if (!id || !booking_status) {
    return res.status(400).json({ msg: "Please provide all fields." });
  }

  // If authorized, proceed with the update
  const updateSql = `
        UPDATE EventApproval 
        SET booking_status = ? 
        WHERE id = ?
        `;

  db.query(updateSql, [booking_status, id], (updateErr) => {
    if (updateErr) {
      console.error("Error updating booking status:", updateErr);
      return res.status(500).json({ msg: "Error updating booking status" });
    }

    res.json({ msg: "Booking status updated successfully" });
  });
});

module.exports = router;
