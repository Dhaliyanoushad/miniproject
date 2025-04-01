const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema(
  {
    // Basic authentication fields
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
      minlength: 6,
    },

    // Profile information
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    collageName: {
      type: String,
      required: true,
      trim: true,
    },
    studentIdNumber: {
      type: String,
    },
    profilePicture: {
      type: String, // URL to profile picture
    },

    // Account settings and status
    role: {
      type: String,
      enum: ["user", "organizer", "admin"],
      default: "user",
    },

    attendedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    registeredEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    // Timestamps
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

// Method to generate profile information
UserSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject();

  // Remove sensitive information
  delete userObject.password;

  return userObject;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
