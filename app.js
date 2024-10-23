// app.js
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

app.use(express.static('public'));
app.use(express.json()); // Middleware for at parse JSON-body

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API Endpoint til at hente vejrdata fra Open-Meteo
app.get('/api/weather', async (req, res) => {
    const latitude = 55.6761; // Breddegrad for København
    const longitude = 12.5683; // Længdegrad for København

    try {
        // Hent vejrdata fra Open-Meteo
        const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        res.json(weatherResponse.data);
    } catch (error) {
        console.error('Fejl ved hentning af vejrdata:', error);
        res.status(500).json({ message: 'Kunne ikke hente vejrdata' });
    }
});


app.get('/api/ping', (req, res) => {
    const serverReceivedTime = Date.now();
    console.log(`Ping received at: ${serverReceivedTime} ms`);

    res.sendStatus(200);

    const serverResponseTime = Date.now();
    console.log(`Response sent at: ${serverResponseTime} ms`);
});


// Start serveren
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
