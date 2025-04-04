const express = require("express");
const router = express.Router();

const hostController = require("../controllers/hostControllers");

router.get("/", hostController.getAllHosts);
// Get all hosts
router.post("/signup", hostController.signUp);
router.post("/login", hostController.hostLogin);
router.get("/current", hostController.currentHost); // Get current host
router.get("/logout", hostController.hostLogout); // Logout host
router.get("/:hostId/event", hostController.getEventsByHostId); // Get all events created by the host
// Reject a host
//router.get("/events/:eventId/requests", hostController.getGuestRequests); // Get guest requests for a specific event
// router.post("/requests/:requestId", hostController.handleGuestRequest); // Handle guest request (accept/reject)

module.exports = router;
