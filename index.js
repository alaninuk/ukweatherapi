
const express = require('express');
const axios = require('axios');


// Load environment variables from .env file
require('dotenv').config();

// Use the environment variable
const port = process.env.PORT || 3000;

const app = express();

app.get('/weather/:postcode', async (req, res) => {
  const postcode = req.params.postcode;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const { default: fetch } = await import('node-fetch');
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${postcode},gb&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving weather data');
  }
});

//const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
