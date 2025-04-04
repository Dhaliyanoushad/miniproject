const Event = require("../models/eventModel");
const Host = require("../models/hostModel"); // Importing the Host model
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
    await Host.findByIdAndUpdate(req.session.hostId, {
      $push: { hostedEvents: savedEvent._id },
    });

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

exports.getRegisteredEvents = async (req, res) => {
  try {
    const { eventIds } = req.query;

    if (!eventIds) {
      return res.status(400).json({ msg: "No event IDs provided" });
    }

    // Split comma-separated event IDs and filter out any empty strings
    const eventIdArray = eventIds.split(",").filter((id) => id.trim());

    // Find all events matching the provided IDs
    const events = await Event.find({ _id: { $in: eventIdArray } }).sort({
      date: -1,
    });

    return res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching registered events:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: err.message });
  }
};

// Handle upcoming events route
exports.getUpcomingEvents = async (req, res) => {
  try {
    // Get current date
    const now = new Date();

    // Find events with dates greater than or equal to current date
    const upcomingEvents = await Event.find({ date: { $gte: now } })
      .sort({ date: 1 }) // Sort by date ascending (closest first)
      .limit(20); // Limit to 20 events for performance

    return res.status(200).json(upcomingEvents);
  } catch (err) {
    console.error("Error fetching upcoming events:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: err.message });
  }
};

// Handle event registration
exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!req.session || !req.session.userId) {
      return res.status(401).json({ msg: "Authentication required" });
    }

    if (!eventId) {
      return res.status(400).json({ msg: "Event ID is required" });
    }

    // Find the event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Check if spots are available
    if (
      event.registeredUsers &&
      event.registeredUsers.length >= event.capacity
    ) {
      return res.status(400).json({ msg: "Event is fully booked" });
    }

    // Check if user is already registered
    if (
      event.registeredUsers &&
      event.registeredUsers.includes(req.session.userId)
    ) {
      return res
        .status(400)
        .json({ msg: "You are already registered for this event" });
    }

    // Add user to the event's registered users
    await Event.findByIdAndUpdate(eventId, {
      $push: { registeredUsers: req.session.userId },
    });

    // Add event to user's registered events
    const User = require("../models/userModel"); // Import User model
    await User.findByIdAndUpdate(req.session.userId, {
      $push: { registeredEvents: eventId },
    });

    return res.status(200).json({ msg: "Successfully registered for event" });
  } catch (err) {
    console.error("Error registering for event:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: err.message });
  }
};

// Handle cancellation of registration
exports.cancelRegistration = async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!req.session || !req.session.userId) {
      return res.status(401).json({ msg: "Authentication required" });
    }

    if (!eventId) {
      return res.status(400).json({ msg: "Event ID is required" });
    }

    // Remove user from event's registered users
    await Event.findByIdAndUpdate(eventId, {
      $pull: { registeredUsers: req.session.userId },
    });

    // Remove event from user's registered events
    const User = require("../models/userModel"); // Import User model
    await User.findByIdAndUpdate(req.session.userId, {
      $pull: { registeredEvents: eventId },
    });

    return res.status(200).json({ msg: "Successfully cancelled registration" });
  } catch (err) {
    console.error("Error cancelling registration:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: err.message });
  }
};
