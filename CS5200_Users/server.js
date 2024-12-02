require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth'); // Import your routes

// Middleware
app.use(express.json()); // Parse JSON requests

// Register routes
app.use('/api/auth', authRoutes); // All routes in auth.js will be prefixed with /api/auth

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Authentication server running on port ${PORT}`);
});
