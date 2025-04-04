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
      SELECT ea.event_id,ea.id, g.guest_id, g.full_name,ea.booking_status
      FROM EventApproval ea
      JOIN guests g ON ea.guest_id = g.guest_id
    `;

    db.query(pendingGuestSql, (err, pendingGuests) => {
      if (err) {
        console.error("Error fetching pending guests:", err);
        return res.status(500).json({ msg: "Error fetching pending guests." });
      }

      // Group guests by event_id
      const eventMap = events.map((event) => ({
        ...event,
        registered_guests: pendingGuests
          .filter((guest) => guest.event_id === event.event_id)
          .map((guest) => ({
            id: guest.id,
            guest_id: guest.guest_id,
            name: guest.full_name,
            booking_status: guest.booking_status,
          })),
      }));

      res.json(eventMap);
    });
  });
});
// Get all event bookings (protected)
router.get("/eventbookings", (req, res) => {
  const db = req.app.locals.db;

  // Join eventapproval with events to fetch event details
  const sql = `
    SELECT ea.*, e.*
    FROM eventapproval ea
    JOIN events e ON ea.event_id = e.event_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching event bookings:", err);
      return res.status(500).json({ msg: "Error fetching event bookings." });
    }

    console.log("Event Bookings with Event Details:", results);
    res.json(results);
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

// Register for an event (protected)
// This route is for guests to register for an event
router.post("/bookticket", verifyToken, (req, res) => {
  const db = req.app.locals.db;
  const { guest_id, event_id } = req.body;

  if (!guest_id || !event_id) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  const sql = `
    INSERT INTO eventapproval (guest_id, event_id) 
    VALUES (?, ?)
  `;

  db.query(sql, [guest_id, event_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ msg: "Database error" });
    }
    res.status(200).json({ msg: "Ticket booked successfully" });
  });
});

router.delete("/cancelbooking", verifyToken, (req, res) => {
  const db = req.app.locals.db;
  const { guest_id, event_id } = req.body;

  if (!guest_id || !event_id) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: guest_id and event_id are required",
    });
  }

  console.log("Attempting to cancel booking:", { guest_id, event_id });

  // Delete the booking if it exists
  const deleteSql =
    "DELETE FROM eventapproval WHERE guest_id = ? AND event_id = ?";

  db.query(deleteSql, [guest_id, event_id], (deleteErr, deleteResults) => {
    if (deleteErr) {
      console.error("Error cancelling booking:", deleteErr);
      return res.status(500).json({
        success: false,
        message: "Error cancelling booking",
        error: deleteErr.message,
      });
    }

    // Optionally update the event's available slots
    // This would be another query to update the events table if needed

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });
  });
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
      return res.status(404).json({ msg: "Event not found1" });
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
      return res.status(404).json({ msg: "Event not found2" });
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

// Update guest request status (Confirm/Reject)
router.patch("/:event_id/guests/:guest_id", verifyToken, (req, res) => {
  const db = req.app.locals.db;
  const { event_id, guest_id } = req.params;
  const { booking_status } = req.body; // "Confirm" or "Reject"

  if (!booking_status) {
    return res.status(400).json({ msg: "Please provide booking status." });
    a;
  }
  const updateSql =
    "UPDATE EventApproval SET booking_status = ? WHERE event_id = ? AND guest_id = ?";

  db.query(updateSql, [booking_status, event_id, guest_id], (updateErr) => {
    if (updateErr) {
      console.error("Error updating booking status:", updateErr);
      return res.status(500).json({ msg: "Error updating guest request" });
    }
    res.json({ msg: "Guest request updated successfully" });
  });
  // Verify that the event exists
  // const checkEventSql = "SELECT host_id FROM events WHERE event_id = ?";

  // db.query(checkEventSql, [event_id], (err, results) => {
  //   if (err) {
  //     console.error("Error checking event:", err);
  //     return res.status(500).json({ msg: "Server error" });
  //   }

  //   if (results.length === 0) {
  //     return res.status(404).json({ msg: "Event not found3" });
  //   }

  //   const event = results[0];

  //   // Check if the current user is the host
  //   if (event.host_id !== req.user.id) {
  //     return res
  //       .status(403)
  //       .json({ msg: "You are not authorized to update this guest request" });
  //   }
  // });
});

router.get("/myevents/:id", verifyToken, (req, res) => {
  const db = req.app.locals.db;
  const guest_id = req.params.id; // Extract guest_id from the authenticated user

  // Query to fetch events registered by the user
  const sql = `
    SELECT e.*
    FROM eventapproval ea
    JOIN events e ON ea.event_id = e.event_id
    WHERE ea.guest_id = ?
  `;

  db.query(sql, [guest_id], (err, results) => {
    if (err) {
      console.error("Error fetching registered events:", err);
      return res.status(500).json({ msg: "Error fetching registered events." });
    }

    res.json({ registered_events: results });
  });
});

router.get("/eventbookings/:guestid", (req, res) => {
  const db = req.app.locals.db;
  const guestId = req.params.guestid; // Extract guest ID from route parameters

  // Query to fetch only the events registered by the specified guest
  const sql = `
    SELECT ea.*, e.*
    FROM eventapproval ea
    JOIN events e ON ea.event_id = e.event_id
    WHERE ea.guest_id = ?;
  `;

  db.query(sql, [guestId], (err, results) => {
    if (err) {
      console.error("Error fetching event bookings:", err);
      return res.status(500).json({ msg: "Error fetching event bookings." });
    }

    console.log(`Event Bookings for Guest ID ${guestId}:`, results);
    res.json(results);
  });
});

router.delete("/:event_id", verifyToken, (req, res) => {
  const db = req.app.locals.db;
  const { event_id } = req.params; // Get event ID from URL

  if (!event_id) {
    return res.status(400).json({ message: "Event ID is required" });
  }

  const sql = "DELETE FROM events WHERE event_id = ?";

  db.query(sql, [event_id], (err, result) => {
    if (err) {
      console.error("Error deleting event:", err);
      return res.status(500).json({ message: "Failed to delete event" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  });
});

module.exports = router;
