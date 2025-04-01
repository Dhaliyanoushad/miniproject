const Host = require("../models/hostModel"); // Importing the Host model

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
    return res
      .status(400)
      .json({ msg: "Phone number and password are required" });
  }
  try {
    const existingHost = await Host.findOne({ email });
    if (!existingHost) {
      return res.status(400).json({ msg: "Host doesn't exist" });
    }
    if (existingHost.password !== password) {
      return res.status(400).json({ msg: "Invalid password" });
    }
    if (!existingHost.verified) {
      return res
        .status(403)
        .json({ msg: "Host not verified by admin. Please wait for approval." });
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
