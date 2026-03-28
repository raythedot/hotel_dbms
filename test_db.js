const db = require('./backend/config/db');

async function test() {
    try {
        console.log('Testing DB connection...');
        const conn = await db.getConnection();
        console.log('Connection successful!');
        conn.release();
        process.exit(0);
    } catch (err) {
        console.error('Connection failed:', err.message);
        process.exit(1);
    }
}

test();
