require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Import database connection
const userRoutes = require("./routes/userRoutes");
const hostRoutes = require("./routes/hostRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Import admin routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.use("/users", userRoutes);
app.use("/hosts", hostRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
