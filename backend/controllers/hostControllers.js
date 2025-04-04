const Host = require("../models/hostModel"); // Importing the Host model
const Event = require("../models/eventModel"); // Importing the Event model
exports.getAllHosts = async (req, res) => {
  try {
    const allHosts = await Host.find();
    return res.status(200).json(allHosts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.signUp = async (req, res) => {
  const { phoneNumber, fullName, email, department, password } = req.body;
  if (!phoneNumber || !fullName || !email || !department || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const existingHost = await Host.findOne({ email });
    if (existingHost) {
      return res
        .status(400)
        .json({ msg: "Host already exists, try to log in" });
    }
    const newHost = new Host({
      phoneNumber,
      fullName,
      email,
      department,
      password,
    });
    await newHost.save();
    return res
      .status(200)
      .json({ msg: `Signup successful, waiting for admin verification` });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.hostLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const existingHost = await Host.findOne({ email });
    if (!existingHost) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Direct password comparison
    if (existingHost.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    req.session.hostId = existingHost._id;
    return res.status(200).json({
      success: true,
      msg: `Login successful`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.currentHost = async (req, res) => {
  try {
    if (!req.session.hostId) {
      return res.status(401).json({ msg: "Not authenticated" });
    }

    const host = await Host.findById(req.session.hostId);
    if (!host) {
      return res.status(404).json({ msg: "host not found" });
    }

    // Clone the host object and remove the password
    const hostResponse = { ...host.toObject() };
    delete hostResponse.password;

    return res.status(200).json(hostResponse);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.hostLogout = async (req, res) => {
  try {
    // Check if user is actually logged in
    if (!req.session.hostId) {
      return res.status(400).json({ msg: "No active session found" });
    }

    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to logout", error: err.message });
      }

      // Clear the cookie if you're using cookie-based sessions
      res.clearCookie("connect.sid"); // Use your session cookie name here

      return res.status(200).json({
        success: true,
        msg: "Logout successful",
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all events created by the host
exports.getEventsByHostId = async (req, res) => {
  try {
    const hostId = req.params;

    // Find events in MongoDB where host_id matches
    const hostEvents = await Event.find({ host_id: hostId });

    // Format the events as needed
    const formattedEvents = hostEvents.map((event) => ({
      id: event._id,
      title: event.title,
      date: new Date(event.event_date).toISOString().split("T")[0],
      time: event.event_time,
      venue: event.venue,
      description: event.description,
      category: event.category,
      capacity: event.capacity,
      // Add other fields as needed
    }));

    res.json(formattedEvents);
  } catch (error) {
    console.error("Error fetching host events:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get guest requests for a specific event
exports.getGuestRequests = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Check if host is authenticated
    if (!req.session.hostId) {
      return res.status(401).json({ msg: "Not authenticated" });
    }

    // Find the host
    const host = await Host.findById(req.session.hostId);

    if (!host) {
      return res.status(404).json({ msg: "Host not found" });
    }

    // Check if the event belongs to this host
    const event = await Event.findById(eventId).populate("guestRequests");

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Verify that this host owns this event
    if (event.host.toString() !== req.session.hostId) {
      return res
        .status(403)
        .json({ msg: "Unauthorized: This event doesn't belong to you" });
    }

    return res.status(200).json(event.guestRequests);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Handle guest request (accept/reject)
exports.handleGuestRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body; // action should be 'accept' or 'reject'

    // Check if host is authenticated
    if (!req.session.hostId) {
      return res.status(401).json({ msg: "Not authenticated" });
    }

    // Validate the action
    if (action !== "accept" && action !== "reject") {
      return res
        .status(400)
        .json({ msg: "Invalid action. Use 'accept' or 'reject'" });
    }

    // Find the guest request
    const guestRequest = await GuestRequest.findById(requestId);

    if (!guestRequest) {
      return res.status(404).json({ msg: "Guest request not found" });
    }

    // Find the event to verify ownership
    const event = await Event.findById(guestRequest.event);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Verify that this host owns this event
    if (event.host.toString() !== req.session.hostId) {
      return res
        .status(403)
        .json({ msg: "Unauthorized: This event doesn't belong to you" });
    }

    // Update the request status based on the action
    guestRequest.status = action === "accept" ? "approved" : "rejected";
    await guestRequest.save();

    return res.status(200).json({
      success: true,
      msg: `Guest request ${action}ed successfully`,
      guestRequest,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
