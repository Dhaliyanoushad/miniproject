const express = require("express");
const router = express.Router();

const eventControllers = require("../controllers/eventControllers");

router.get("/", eventControllers.getAllEvents); // Get all events

router.post("/create", eventControllers.createEvent); // Create a new event

module.exports = router;
