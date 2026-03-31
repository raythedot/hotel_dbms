const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setup() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    });

    try {
        console.log('Connecting to MySQL...');
        const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Creating database and tables...');
        await connection.query(schema);
        
        console.log('Database hotel_db setup successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Setup failed:', err.message);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

setup();
