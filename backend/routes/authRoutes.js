const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authMiddleware");

const SECRET_KEY = "your_secret_key";

// POST route for host signup
router.post("/signuphost", async (req, res) => {
  const { fullname, email, password, department, phone_number } = req.body;

  const db = req.app.locals.db;

  // if (!fullname || !email || !password || !department || !phone_number) {
  //   return res.status(400).json({ msg: "Please provide all fields." });
  // }
  if (!fullname || !email || !password || !department || !phone_number) {
    const missingFields = [];
    if (!fullname) missingFields.push("fullname");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!department) missingFields.push("department");
    if (!phone_number) missingFields.push("phone_number");

    return res.status(400).json({
      msg: "Missing required fields",
      missingFields: missingFields,
    });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 6 characters long." });
  }

  try {
    // Check if the email already exists
    const checkEmailSql = "SELECT * FROM hosts WHERE email = ?";
    db.query(checkEmailSql, [email], async (err, results) => {
      if (err) {
        console.error("Error checking email:", err);
        return res.status(500).json({ msg: "Database error." });
      }
      if (results.length > 0) {
        return res.status(400).json({ msg: "Email already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // SQL query to insert the new host into the database
      const sql = `INSERT INTO hosts (fullname, email, password, department, phone_number) VALUES (?, ?, ?, ?, ?)`;

      db.query(
        sql,
        [fullname, email, hashedPassword, department, phone_number],
        (err, result) => {
          if (err) {
            console.log("Database Insert Error:", err);
            return res
              .status(500)
              .json({ msg: "Something went wrong. Please try again." });
          }

          // Generate JWT token
          const token = jwt.sign(
            { id: result.insertId, email: email },
            SECRET_KEY,
            { expiresIn: "1h" }
          );
          const host = {
            id: result.insertId,
            name: fullname,
            email: email,
            department: department,
            phone_number: phone_number,
            joined: new Date(),
          };

          // localStorage.setItem("host", JSON.stringify(host));
          // localStorage.setItem("token", token);

          return res.status(201).json({
            msg: "Signup successful",
            token,
            host: host,
          });
        }
      );
    });
  } catch (error) {
    console.error("Error during password hashing:", error);
    return res.status(500).json({ msg: "Error processing request." });
  }
});

// POST route for guest signup
router.post("/signupguest", async (req, res) => {
  const { full_name, email, password, college_name, student_id } = req.body;
  const db = req.app.locals.db;

  if (!full_name || !email || !password || !college_name || !student_id) {
    return res.status(400).json({ msg: "Please provide all fields." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 6 characters long." });
  }

  try {
    // Check if the email already exists
    const checkEmailSql = "SELECT * FROM guests WHERE email = ?";
    db.query(checkEmailSql, [email], async (err, results) => {
      if (err) {
        console.error("Error checking email:", err);
        return res.status(500).json({ msg: "Database error." });
      }
      if (results.length > 0) {
        return res.status(400).json({ msg: "Email already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // SQL query to insert the new guest into the database
      const sql = `INSERT INTO guests (full_name, email, password, college_name, student_id) VALUES (?, ?, ?, ?, ?)`;

      db.query(
        sql,
        [full_name, email, hashedPassword, college_name, student_id],
        (err, result) => {
          if (err) {
            console.log("Database Insert Error:", err);
            return res
              .status(500)
              .json({ msg: "Something went wrong. Please try again." });
          }

          // Generate JWT token
          const token = jwt.sign(
            { id: result.insertId, email: email },
            SECRET_KEY,
            { expiresIn: "1h" }
          );

          const guest = {
            id: result.insertId,
            name: full_name,
            email: email,
            college_name: college_name,
            student_id: student_id,
            joined: new Date(),
          };

          return res.status(201).json({
            msg: "Signup successful",
            token,
            guest: guest,
          });
        }
      );
    });
  } catch (error) {
    console.error("Error during password hashing:", error);
    return res.status(500).json({ msg: "Error processing request." });
  }
});

// POST route for host login
router.post("/loginhost", async (req, res) => {
  const { email, password } = req.body;
  const db = req.app.locals.db;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email and password." });
  }

  const sql = `SELECT * FROM hosts WHERE email = ?`;
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Database error." });
    }
    if (results.length === 0) {
      return res.status(400).json({ msg: "User not found." });
    }

    const user = results[0];

    // Compare provided password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.host_id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ msg: "Login successful", token, host: user });
  });
});

// POST route for guest login
router.post("/loginguest", async (req, res) => {
  const { email, password } = req.body;
  const db = req.app.locals.db;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email and password." });
  }

  const sql = `SELECT * FROM guests WHERE email = ?`;
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Database error." });
    }
    if (results.length === 0) {
      return res.status(400).json({ msg: "User not found." });
    }

    const user = results[0];

    // Compare provided password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.guest_id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      msg: "Login successful",
      token,
      guest: user,
    });
  });
});

// Optional: Token verification route
router.post("/verifytoken", verifyToken, (req, res) => {
  res.status(200).json({ msg: "Token is valid", user: req.user });
});

module.exports = router;
