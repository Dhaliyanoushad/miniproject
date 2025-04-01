require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const connectDB = require("./config/db"); // Import database connection
const userRoutes = require("./routes/userRoutes");
const hostRoutes = require("./routes/hostRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Import admin routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies/credentials
  })
);
app.use(
  session({
    secret: "your_secret_key", // Change this to a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// Connect to MongoDB
connectDB();

app.use("/users", userRoutes);
app.use("/hosts", hostRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
