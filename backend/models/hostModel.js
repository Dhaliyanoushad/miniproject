const mongoose = require("mongoose");

// Host Schema
const HostSchema = new mongoose.Schema(
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
      minlength: 6,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    // Events and metrics
    hostedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    totalEventsHosted: {
      type: Number,
      default: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
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

// Method to get public host profile
HostSchema.methods.getPublicProfile = function () {
  const hostObject = this.toObject({ virtuals: true });
  delete hostObject.password;
  return hostObject;
};

const Host = mongoose.model("Host", HostSchema);

module.exports = Host;
