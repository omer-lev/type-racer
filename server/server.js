const express = require('express');
const app = express();
const colors = require('colors');

const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const baseUrl = process.env.BASE_URL;    

const cors = require('cors');
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// ROUTES
const room = require('./routes/room');


app.get(`${baseUrl}`, (req, res) => {
    res.json({ TypeRacer: "🏎️" });
});

app.use(`${baseUrl}/room`, room);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`.magenta);
});