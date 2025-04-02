require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(express.json());
app.use(cors()); // This allows all origins; for more specific control, you can provide options.

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

// Define a GET route for '/'
app.get("/", (req, res) => {
  console.log("GET / route hit");
  res.send("Welcome to the Efforts API!");
});

app.get("/hosts", (req, res) => {
  const sql = "SELECT * FROM hosts"; // Adjust the SQL query as needed

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ msg: "Error fetching users." });
    }
    res.json(results);
  });
});

// POST route for signup
app.post("/users/signuphost", async (req, res) => {
  const { fullName, email, password, department, phoneNumber } = req.body; // Correcting to match the database schema

  // Validate incoming data (basic validation)
  if (!fullName || !email || !password || !department || !phoneNumber) {
    return res.status(400).json({ msg: "Please provide all fields." });
  }

  // Hash the password (you need to uncomment and implement password hashing if required)
  try {
    // const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert the new host into the database
    const sql = `INSERT INTO hosts (fullname, email, password, department, phone_number) VALUES (?, ?, ?, ?, ?)`;

    db.query(
      sql,
      [fullName, email, password, department, phoneNumber], // Ensure that the names match the database schema
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ msg: "Something went wrong. Please try again." });
        }
        return res
          .status(200)
          .json({ msg: "Host account created successfully." });
      }
    );
  } catch (error) {
    console.error("Error during password hashing:", error);
    res.status(500).json({ msg: "Error hashing password." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
