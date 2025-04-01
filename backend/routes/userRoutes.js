const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");

router.get("/", userController.getAllUsers); // Get all users\

router.post("/signup", userController.signUp);
router.post("/login", userController.userLogin);

module.exports = router;
