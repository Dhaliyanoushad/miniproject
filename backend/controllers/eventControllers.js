const Event = require("../models/eventModel");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort by event date (ascending)
    return res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, date, time, venue, capacity } =
      req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !date ||
      !time ||
      !venue ||
      !capacity
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (!req.session || !req.session.hostId) {
      return res
        .status(401)
        .json({ msg: "Host authentication required. Please log in again." });
    }

    // Create new event
    const newEvent = new Event({
      title,
      description,
      category,
      date,
      time,
      venue,
      capacity,
      hostId: req.session.hostId, // Assuming the host is stored in the session
    });

    // Save event to database
    await newEvent.save();

    return res
      .status(201)
      .json({ msg: "Event created successfully", event: newEvent });
  } catch (err) {
    console.error("Error creating event:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: err.message });
  }
};
