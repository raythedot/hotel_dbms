const mysql = require('mysql2/promise');
require('dotenv').config({ path: './backend/.env' });

async function migrate() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        console.log('Migrating database...');
        
        // Check if city column exists
        const [columns] = await connection.query('SHOW COLUMNS FROM rooms LIKE "city"');
        
        if (columns.length === 0) {
            console.log('Adding city column to rooms table...');
            await connection.query("ALTER TABLE rooms ADD COLUMN city VARCHAR(100) NOT NULL DEFAULT 'Unknown'");
            console.log('Migration completed successfully!');
        } else {
            console.log('City column already exists.');
        }

        // Update existing rooms with some city names if they were 'Unknown'
        await connection.query("UPDATE rooms SET city = 'New York' WHERE room_number = '101' AND city = 'Unknown'");
        await connection.query("UPDATE rooms SET city = 'Los Angeles' WHERE room_number = '102' AND city = 'Unknown'");
        await connection.query("UPDATE rooms SET city = 'Chicago' WHERE room_number = '201' AND city = 'Unknown'");
        await connection.query("UPDATE rooms SET city = 'Houston' WHERE room_number = '202' AND city = 'Unknown'");

        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err.message);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

migrate();
 biological_age: 123
