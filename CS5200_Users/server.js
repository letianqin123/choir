require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const authRoutes = require('./routes/auth'); // Import your routes

// Middleware
app.use(express.json()); // Parse JSON requests

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3001', // Frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies if needed
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions)); // Enable CORS

// Register routes
app.use('/api/auth', authRoutes); // All routes in auth.js will be prefixed with /api/auth

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Authentication server running on port ${PORT}`);
});