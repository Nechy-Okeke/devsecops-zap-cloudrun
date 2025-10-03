// app/server.js

const express = require('express');
const app = express();

// Use the environment variable PORT provided by App Runner, or default to 8080.
// NOTE: 8080 must match the port exposed in your Dockerfile and configured in the CloudFormation template.
const PORT = process.env.PORT || 8080;

// ----------------------------------------------------------------------
// 1. HEALTH CHECK (CRITICAL for App Runner Stabilization)
// ----------------------------------------------------------------------
app.get('/health', (req, res) => {
    // App Runner uses this endpoint (defined in the CFN template) to confirm
    // the container is running and ready to receive traffic.
    res.status(200).send({ status: 'ok', message: 'Application is running' });
});

// ----------------------------------------------------------------------
// 2. APPLICATION ENDPOINTS (ZAP Targets)
// ----------------------------------------------------------------------

// A simple home endpoint - the primary target for ZAP
app.get('/', (req, res) => {
    res.send('<h1>DevSecOps ZAP Target App is Running!</h1>');
});

// A slightly "vulnerable" endpoint for ZAP to find
// ZAP will flag the missing security headers and the lack of input validation.
app.get('/unsafe', (req, res) => {
    res.send('<p>This endpoint is intentionally missing some security headers.</p>');
});

// Example of a path that ZAP might discover (e.g., if linked in the response)
app.get('/login', (req, res) => {
    res.send('<form><h2>Login Form</h2><input type="text" name="username"><button>Submit</button></form>');
});

// ----------------------------------------------------------------------
// 3. START SERVER
// ----------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});