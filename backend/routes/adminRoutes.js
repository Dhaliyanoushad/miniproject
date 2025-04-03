const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminControllers");

router.get("/", adminController.getAllAdmins);
// Get all admins
router.post("/verified", adminController.verifyHost);
router.post("/login", adminController.adminLogin);
//router.get("/logout", adminController.adminLogout); // Logout admin
router.get("/pending", adminController.getPendingHosts); // Get all pending hosts
router.get("/verified", adminController.getVerifiedHosts);
router.patch("/verify/:hostId", adminController.verifyHost); // Approve a host
router.patch("/reject/:hostId", adminController.rejectHost);
router.delete("/host/:hostId", adminController.deleteHost);

module.exports = router;
