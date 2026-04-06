const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });
const db = require('./backend/config/db');

async function verify() {
    try {
        console.log('Verifying Seeding Results...');
        
        // Count total rooms
        const [totalRooms] = await db.query('SELECT COUNT(*) as count FROM rooms');
        console.log(`Total Rooms: ${totalRooms[0].count}`);

        // Count per city
        console.log('\nRooms per City:');
        const [cityCounts] = await db.query('SELECT city, COUNT(*) as count FROM rooms GROUP BY city');
        cityCounts.forEach(c => console.log(`- ${c.city}: ${c.count}`));

        // Count per type
        console.log('\nRooms per Type:');
        const [typeCounts] = await db.query('SELECT room_type, COUNT(*) as count FROM rooms GROUP BY room_type');
        typeCounts.forEach(t => console.log(`- ${t.room_type}: ${t.count}`));

        process.exit(0);
    } catch (err) {
        console.error('Verification failed:', err.message);
        process.exit(1);
    }
}

verify();
