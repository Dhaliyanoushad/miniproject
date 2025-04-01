const express = require("express");
const router = express.Router();

const hostController = require("../controllers/hostControllers");

router.get("/", hostController.getAllHosts);
// Get all hosts
router.post("/signup", hostController.signUp);
router.post("/login", hostController.hostLogin);

module.exports = router;
