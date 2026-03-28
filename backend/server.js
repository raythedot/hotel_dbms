const express = require('express');
const cors = require('cors');
require('dotenv').config();

const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const db = require('./config/db');

const app = express();
const PORT = 5001; // Using 5001 to avoid 5000 conflicts

// Middleware
app.use(cors());
app.use(express.json());

// Check DB connection on startup
db.getConnection()
    .then(() => console.log('Successfully connected to MySQL Database'))
    .catch(err => {
        console.error('CRITICAL: Database connection failed!');
        console.error('Make sure MySQL is running and credentials in .env are correct.');
        console.error(err.message);
    });

// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('Hotel Management System API is running on 5001...');
});

// Error handling
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
