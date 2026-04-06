const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });
const db = require('./backend/config/db');

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Mumbai'];
const roomTypes = ['Single', 'Double', 'Suite', 'Deluxe', 'Luxury'];

async function seed() {
    try {
        console.log('Starting Seeding Process...');
        
        let roomNumberCounter = 501;
        const prices = {
            'Single': 50.00,
            'Double': 80.00,
            'Suite': 150.00,
            'Deluxe': 120.00,
            'Luxury': 250.00
        };

        const insertPromises = [];

        for (const city of cities) {
            for (let i = 0; i < 5; i++) {
                const type = roomTypes[i % roomTypes.length];
                const price = prices[type];
                const roomNumber = roomNumberCounter.toString();
                
                console.log(`- Adding Room ${roomNumber} (${type}) in ${city}`);
                insertPromises.push(
                    db.query(
                        'INSERT IGNORE INTO rooms (room_number, room_type, price, city, status) VALUES (?, ?, ?, ?, ?)',
                        [roomNumber, type, price, city, 'Available']
                    )
                );
                roomNumberCounter++;
            }
        }

        await Promise.all(insertPromises);
        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err.message);
        process.exit(1);
    }
}

seed();
