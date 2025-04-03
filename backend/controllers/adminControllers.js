const Admin = require("../models/adminModel"); // Importing the Admin model
const Host = require("../models/hostModel");

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
    return res.status(200).json({ success: true, msg: `Login successful` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.verifyHost = async (req, res) => {
  try {
    const { hostId } = req.params;

    const host = await Host.findById(hostId);
    if (!host) {
      return res.status(404).json({ msg: "Host not found" });
    }

    if (host.isVerified) {
      return res.status(400).json({ msg: "Host is already verified" });
    }

    host.isVerified = true;
    host.updatedAt = new Date();

    await host.save();

    return res.status(200).json({
      success: true,
      msg: "Host verified successfully",
      host: host.getPublicProfile(),
    });
  } catch (err) {
    console.error("Error verifying host:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: err.message });
  }
};

exports.rejectHost = async (req, res) => {
  try {
    const { hostId } = req.params;

    const host = await Host.findById(hostId);
    if (!host) {
      return res.status(404).json({ msg: "Host not found" });
    }

    // Modified logic to make the function work for both verified and unverified hosts
    if (!host.isVerified) {
      return res.status(400).json({ msg: "Host is already unverified" });
    }

    host.isVerified = false;
    host.updatedAt = new Date();

    await host.save();

    return res.status(200).json({
      success: true,
      msg: "Host unverified successfully",
      host: host.getPublicProfile(),
    });
  } catch (err) {
    console.error("Error unverifying host:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: err.message });
  }
};

exports.getVerifiedHosts = async (req, res) => {
  try {
    const verifiedHosts = await Host.find({ isVerified: true }).sort({
      createdAt: -1,
    });

    // Fixed the console.log after response issue
    console.log(`Fetched ${verifiedHosts.length} verified hosts`);

    return res.status(200).json({
      success: true,
      count: verifiedHosts.length,
      hosts: verifiedHosts,
    });
  } catch (err) {
    console.error("Error fetching verified hosts:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: err.message });
  }
};

exports.getPendingHosts = async (req, res) => {
  try {
    const unverifiedHosts = await Host.find({ isVerified: false }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: unverifiedHosts.length,
      hosts: unverifiedHosts,
    });
  } catch (err) {
    console.error("Error fetching unverified hosts:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: err.message });
  }
};

exports.deleteHost = async (req, res) => {
  try {
    const { hostId } = req.params;

    const host = await Host.findById(hostId);
    if (!host) {
      return res.status(404).json({ msg: "Host not found" });
    }

    await Host.findByIdAndDelete(hostId);

    return res.status(200).json({
      success: true,
      msg: "Host deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting host:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getHostById = async (req, res) => {
  try {
    const { hostId } = req.params;

    const host = await Host.findById(hostId);
    if (!host) {
      return res.status(404).json({ msg: "Host not found" });
    }

    return res.status(200).json({
      success: true,
      host: host.getPublicProfile(),
    });
  } catch (err) {
    console.error("Error fetching host:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};
