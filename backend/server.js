require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const hostRoutes = require("./routes/hostRoutes");
const eventRoutes = require("./routes/eventRoutes");
const guestRoutes = require("./routes/guestRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests only from your frontend
    credentials: true, // Allow cookies and authentication headers
  })
);

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "doolsSQL2025", // Your MySQL password
  database: "efforst", // Your database name
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the process if the connection fails
  } else {
    console.log("Connected to the MySQL database");
  }
});

// Make db available to routes
app.locals.db = db;

// Define a GET route for '/'
app.get("/", (req, res) => {
  console.log("GET / route hit");
  res.send("Welcome to the Efforts API!");
});

// Use the routes
app.use("/auth", authRoutes);
app.use("/api/hosts", hostRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/guests", guestRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
