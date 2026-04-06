const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });
const db = require('./backend/config/db');

async function checkData() {
    try {
        console.log('Querying current rooms...');
        const [rooms] = await db.query('SELECT * FROM rooms');
        console.log(`Current rooms: ${rooms.length}`);
        
        const cities = [...new Set(rooms.map(r => r.city))];
        const types = [...new Set(rooms.map(r => r.room_type))];
        
        console.log('Current cities:', cities);
        console.log('Current room types:', types);
        
        cities.forEach(city => {
            const count = rooms.filter(r => r.city === city).length;
            console.log(`- ${city}: ${count} rooms`);
        });
        
        types.forEach(type => {
            const count = rooms.filter(r => r.room_type === type).length;
            console.log(`- ${type}: ${count} rooms`);
        });
        
        process.exit(0);
    } catch (err) {
        console.error('Error querying database:', err.message);
        process.exit(1);
    }
}

checkData();
