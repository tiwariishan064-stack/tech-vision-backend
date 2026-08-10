app.post('/api/register', async (req, res) => {
    // 1. Capture the data sent from the frontend
    const formData = req.body;

    // ---------------------------------------------------------
    // [KEEP YOUR EXISTING MYSQL CODE HERE]
    // (e.g., db.query('INSERT INTO registrations...', ...))
    // ---------------------------------------------------------

    // 2. Send a live copy of the data to Google Sheets
    try {
        await fetch('https://script.google.com/macros/s/AKfycby5zD1HSQZdai6X-QUWmcfCRL4yoXFH12RcS_d7WtEDDYxXad4XXfTc2klPfFoNybZLQg/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        console.log("Data successfully sent to Google Sheets!");
    } catch (error) {
        console.error("Failed to send to Google Sheets:", error);
    }

    // 3. Send the final success response back to the frontend website
    res.json({ success: true, message: "Registration complete!" });
});