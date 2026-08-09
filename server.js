const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Create MySQL Connection Pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',         // Change to your MySQL username
  password: 'ishan', // Change to your MySQL password
  database: 'tech_vision_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Database Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.message);
  } else {
    console.log('Successfully connected to MySQL database.');
    connection.release();
  }
});

// API Endpoint to Handle Registration
app.post('/api/register', (req, res) => {
  const { name, phone, email, college, course, idnum, events, team, totalFee } = req.body;

  // Basic server-side validation
  if (!name || !phone || !email || !events || events.length === 0) {
    return res.status(400).json({ success: false, message: 'Missing required fields or events.' });
  }

  // Convert events array and team text to strings for storage
  const eventsString = events.join(', ');
  const teamString = team || '';

  const query = `
    INSERT INTO registrations (full_name, phone, email, college, course, idnum, selected_events, team_members, total_fee)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [name, phone, email, college, course, idnum, eventsString, teamString, totalFee];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Database insert error:', err);
      return res.status(500).json({ success: false, message: 'Database error. Registration failed.' });
    }

    return res.status(201).json({
      success: true,
      message: 'Registration successful!',
      registrationId: result.insertId
    });
  });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});