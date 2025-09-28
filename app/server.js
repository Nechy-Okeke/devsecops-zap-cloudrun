// app/server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Basic health check endpoint (crucial for AWS App Runner)
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'ok', message: 'Application is running' });
});

// A simple home endpoint - the primary target for ZAP
app.get('/', (req, res) => {
  res.send('<h1>DevSecOps ZAP Target App is Running!</h1>');
});

// A slightly "vulnerable" endpoint for ZAP to find
app.get('/unsafe', (req, res) => {
  // ZAP will look for missing security headers here
  res.send('<p>This endpoint is intentionally missing some security headers.</p>');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});