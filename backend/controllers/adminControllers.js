const Admin = require("../models/adminModel"); // Importing the Admin model

exports.getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find();
    return res.status(200).json(allAdmins);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(400).json({ msg: "Admin doesn't exist" });
    }
    if (existingAdmin.password !== password) {
      return res.status(400).json({ msg: "Invalid password" });
    }
    return res.status(200).json({ msg: `Login successful` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.verifyHost = async (req, res) => {
  const { hostId } = req.params;
  try {
    const host = await Host.findById(hostId);
    if (!host) {
      return res.status(404).json({ msg: "Host not found" });
    }
    host.verified = true;
    await host.save();
    return res.status(200).json({ msg: "Host verified successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
