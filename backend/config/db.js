const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aboobackerfa:llNHI6V86h7kn2kJ@cluster0.mltctcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to database...");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
