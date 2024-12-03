// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3001', // Frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies if needed
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Import Routes
const membersRoute = require('./routes/members');
const attendanceRoute = require('./routes/attendance');
const membershipRoute = require('./routes/membership');
const donationsRoute = require('./routes/donations');

// Use Routes
app.use('/api/members', membersRoute);
app.use('/api/attendance', attendanceRoute);
app.use('/api/membership', membershipRoute);
app.use('/api/donations', donationsRoute);

// Test Route
app.get('/', (req, res) => {
  res.send('Server is working!');
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});