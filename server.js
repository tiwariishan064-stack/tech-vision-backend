const express = require('express');
const cors = require('cors');

const app = express();

// Middleware to parse JSON and allow cross-origin requests
app.use(cors());
app.use(express.json());

// Registration Route
app.post('/api/register', (req, res) => {
    const formData = req.body;

    // 1. INSTANTLY reply to the frontend so the user doesn't wait!
    res.json({ success: true, message: "Registration complete!" });

    // 2. FIRE AND FORGET: Send data to Google Sheets in the background
    fetch('https://script.google.com/macros/s/AKfycbzLYsoed2iICO8wBnIKKMugk86nV5ZaTusxBNhBfQb9Jl_qCuyWmmzdyWrcAeMwpjaeFQ/exec', { // Make sure this is your LATEST Version 5 URL!
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(() => {
        console.log("Background Task: Data successfully sent to Google Sheets!");
    })
    .catch((error) => {
        console.error("Background Task Failed:", error);
    });
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
