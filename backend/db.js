const mysql = require("mysql2");

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "!q@w)e(r2627", // Replace with your MySQL password
  database: "event_management", // Replace with your database name
});

// Function to insert a new user into the 'users' table
const insertUser = (student_id, name, email, password, role) => {
  const sql = `INSERT INTO users (student_id, name, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;

  // Hash the password before inserting (use a hashing library like bcrypt in production)
  // For now, assuming password is plain text, you can replace this with actual password hashing
  db.query(
    sql,
    [student_id, name, email, password, role],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err.message);
      } else {
        console.log("User inserted successfully! User ID:", result.insertId);
      }
    }
  );
};

// Example: Inserting a new user
insertUser("S123456", "John Doe", "john.doe@example.com", "password123", "guest");

// Close the database connection
db.end((err) => {
  if (err) {
    console.error("Error closing the connection:", err.message);
  } else {
    console.log("Database connection closed.");
  }
});


// module.exports = db;
