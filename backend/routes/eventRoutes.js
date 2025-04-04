const express = require("express");
const router = express.Router();

const eventControllers = require("../controllers/eventControllers");

router.get("/", eventControllers.getAllEvents); // Get all events

router.post("/create", eventControllers.createEvent); // Create a new event

router.get("/registered", eventControllers.getRegisteredEvents);
router.get("/upcoming", eventControllers.getUpcomingEvents);
router.post("/register", eventControllers.registerForEvent);
router.post("/cancel-registration", eventControllers.cancelRegistration);
module.exports = router;
