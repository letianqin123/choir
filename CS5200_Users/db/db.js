require('dotenv').config(); // Load .env variables
const mysql = require('mysql2/promise'); // Use the promise-based MySQL library

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

(async () => {
    try {
        // Test the connection
        const connection = await pool.getConnection();
        console.log(`Connected to the database: ${process.env.DB_NAME}`);
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
})();

module.exports = pool; // Export the pool for use in other files
