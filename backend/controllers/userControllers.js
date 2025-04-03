const User = require("../models/userModel"); // Importing the User model

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.signUp = async (req, res) => {
  const { fullName, email, collageName, password, studentIdNumber } = req.body;
  if (!fullName || !email || !collageName || !password || !studentIdNumber) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User already exists, try to log in" });
    }
    const newUser = new User({
      fullName,
      email,
      collageName,
      password,
      studentIdNumber,
    });
    await newUser.save();
    return res.status(200).json({ msg: `Signup successful, user created` });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Direct password comparison
    if (existingUser.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    req.session.userId = existingUser._id;
    return res.status(200).json({
      success: true,
      msg: `Login successful`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.currentUser = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Not authenticated" });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Clone the user object and remove the password
    const userResponse = { ...user.toObject() };
    delete userResponse.password;

    return res.status(200).json(userResponse);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.userLogout = async (req, res) => {
  try {
    // Check if user is actually logged in
    if (!req.session.userId) {
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
