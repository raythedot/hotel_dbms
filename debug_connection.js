const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });

async function debug() {
    console.log('--- Database Debugger ---');
    console.log('Host:', process.env.DB_HOST);
    console.log('User:', process.env.DB_USER);
    console.log('Name:', process.env.DB_NAME);
    
    try {
        console.log('\n1. Attempting connection to ' + process.env.DB_HOST + '...');
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectTimeout: 5000
        });
        console.log('SUCCESS: Connection established.');
        
        console.log('\n2. Testing query...');
        const [rows] = await conn.execute('SELECT 1 + 1 AS result');
        console.log('SUCCESS: Query executed. Result:', rows[0].result);
        
        await conn.end();
        console.log('\nDebug finished successfully.');
    } catch (err) {
        console.error('\nFAILURE: Connection or Query failed.');
        console.error('Error Code:', err.code);
        console.error('Error Message:', err.message);
        console.log('\nPossible fixes:');
        console.log('1. Ensure your MySQL service is running.');
        console.log('2. Check if DB_PASSWORD in backend/.env is correct.');
        console.log('3. If using localhost, try changing DB_HOST to 127.0.0.1 in backend/.env.');
    }
}

debug();
