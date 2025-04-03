const mongoose = require("mongoose");

// Event Schema
const EventSchema = new mongoose.Schema(
  {
    // Basic event information
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Academic",
        "Cultural",
        "Sports",
        "Workshops & Seminars",
        "Exhibitions",
        "Competitions",
        "Volunteering",
        "Others",
      ],
    },

    // Date and time
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },

    // Location
    venue: {
      type: String,
      required: true,
      trim: true,
    },

    // Capacity and registration

    registeredAttendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    attendeeCount: {
      type: Number,
      default: 0,
    },
    capacity: {
      type: Number,
      required: true,
    },

    // Event status
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Host",
      required: true,
    },

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

// Method to get event details for public viewing
EventSchema.methods.getPublicDetails = function () {
  const eventObject = this.toObject({ virtuals: true });
  return eventObject;
};

// Helper method to check if registration is still open
EventSchema.methods.isRegistrationOpen = function () {
  const now = new Date();
  return (
    now < this.registrationDeadline &&
    this.status === "upcoming" &&
    !this.isSoldOut
  );
};

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
