const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

// ✅ Allow frontend requests (CORS issue fix)
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "!q@w)e(r2627",
    database: "miniproject"
});

db.connect((err) => {
    if (err) throw err;
    console.log("✅ MySQL Connected...");
});

// ✅ Registration Route (Handles both Creator & Explorer)
app.post("/register", async (req, res) => {
    const { full_name, email, password, occupation, user_type, phone, student_id } = req.body;

    try {
        // ✅ Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        let sql, values;
        if (user_type === "creator") {
            sql = "INSERT INTO registration (name, email, password, occupation, phone) VALUES (?, ?, ?, ?, ?)";
            values = [full_name, email, hashedPassword, occupation, phone];
        } else if (user_type === "explorer") {
            sql = "INSERT INTO registration (name, email, password, occupation, student_id) VALUES (?, ?, ?, ?, ?)";
            values = [full_name, email, hashedPassword, occupation, student_id];
        }

        db.query(sql, values, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, message: "User registered!" });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Login Route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM registration WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            const match = await bcrypt.compare(password, results[0].password);
            if (match) {
                res.json({ success: true, message: "Login successful" });
            } else {
                res.status(400).json({ success: false, message: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    });
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
