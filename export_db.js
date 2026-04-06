const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });
const mysql = require('mysql2/promise');

async function exportDB() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'shivam1509',
            database: process.env.DB_NAME || 'hotel_db'
        });
        
        const [rooms] = await connection.execute('SELECT * FROM rooms');
        fs.writeFileSync('db_export.json', JSON.stringify(rooms, null, 2));
        console.log('Exported ' + rooms.length + ' rooms');
        await connection.end();
        process.exit(0);
    } catch (err) {
        fs.writeFileSync('db_error.txt', err.message + '\n' + err.stack);
        console.error('Export failed: ' + err.message);
        process.exit(1);
    }
}

exportDB();
