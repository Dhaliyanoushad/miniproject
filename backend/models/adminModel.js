const mongoose = require("mongoose");

// Admin Schema
const AdminSchema = new mongoose.Schema(
  {
    // Basic information
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    // Contact information
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

AdminSchema.methods.getPublicProfile = function () {
  const adminObject = this.toObject({ virtuals: true });
  delete adminObject.password;
  return adminObject;
};
const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
