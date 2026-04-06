const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });
const db = require('./backend/config/db');

async function testQuery() {
    let log = '';
    try {
        log += 'Testing connection...\n';
        const [test] = await db.query('SELECT 1');
        log += 'Connection OK\n';

        log += 'Querying rooms...\n';
        const [rows] = await db.query('SELECT * FROM rooms');
        log += `Found ${rows.length} rooms\n`;
        log += JSON.stringify(rows, null, 2) + '\n';
        
    } catch (err) {
        log += 'ERROR: ' + err.message + '\n';
        log += err.stack + '\n';
    }
    
    fs.writeFileSync('debug_db.txt', log);
    process.exit(0);
}

testQuery();
