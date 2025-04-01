const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminControllers");

router.get("/", adminController.getAllAdmins);
// Get all admins
router.post("/verified", adminController.verifyHost);
router.post("/login", adminController.adminLogin);

module.exports = router;
