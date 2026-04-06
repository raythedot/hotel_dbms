const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });
const mysql = require('mysql2/promise');

const cities = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Goa', 'Jaipur', 
    'Hyderabad', 'Chennai', 'Kolkata', 'Agra', 'Udaipur'
];

const roomTypes = ['Single', 'Double', 'Suite', 'Deluxe', 'Luxury'];

const prices = {
    'Single': 2500,
    'Double': 4500,
    'Suite': 8500,
    'Deluxe': 6500,
    'Luxury': 12000
};

async function seed() {
    let connection;
    try {
        console.log('Connecting to database...');
        // Using direct connection to ensure we catch errors outside the pool
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'shivam1509',
            database: process.env.DB_NAME || 'hotel_db'
        });

        console.log('Successfully connected!');

        let roomNumberCounter = 701;
        
        for (const city of cities) {
            console.log(`Seeding rooms for ${city}...`);
            for (let i = 0; i < 5; i++) {
                const type = roomTypes[i % roomTypes.length];
                const price = prices[type];
                const roomNumber = (roomNumberCounter++).toString();
                
                await connection.execute(
                    'INSERT IGNORE INTO rooms (room_number, room_type, price, city, status) VALUES (?, ?, ?, ?, ?)',
                    [roomNumber, type, price, city, 'Available']
                );
            }
        }

        console.log('Seeding completed successfully!');
        await connection.end();
        process.exit(0);
    } catch (err) {
        console.error('SEEDING FAILED!');
        console.error('Error Message:', err.message);
        console.error('Stack Trace:', err.stack);
        if (connection) await connection.end();
        process.exit(1);
    }
}

seed();
