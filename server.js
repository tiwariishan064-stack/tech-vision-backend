const express = require('express');
const cors = require('cors');

const app = express();

// Middleware to parse JSON and allow cross-origin requests
app.use(cors());
app.use(express.json());

// Registration Route
app.post('/api/register', async (req, res) => {
    const formData = req.body;

    try {
        // Send data to your Google Sheets Web App
        await fetch('https://script.google.com/macros/s/AKfycby5zD1HSQZdai6X-QUWmcfCRL4yoXFH12RcS_d7WtEDDYxXad4XXfTc2klPfFoNybZLQg/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        console.log("Data successfully sent to Google Sheets!");
        // Send success back to your frontend website
        res.json({ success: true, message: "Registration complete!" });

    } catch (error) {
        console.error("Failed to send to Google Sheets:", error);
        res.status(500).json({ success: false, message: "Server error while saving." });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});