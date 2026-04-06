const db = require('./backend/config/db');

async function migrate() {
    try {
        console.log('Migrating database...');
        
        // Try to drop the city column, ignore if it doesn't exist
        try {
            await db.execute('ALTER TABLE rooms DROP COLUMN city');
            console.log('Dropped city column.');
        } catch(err) {
            console.log('City column might already be dropped: ' + err.message);
        }

        // Increase price
        await db.execute('UPDATE rooms SET price = price * 1.1');
        console.log('Increased room prices by 10%.');
        
        console.log('Migration complete.');
        process.exit(0);
    } catch(err) {
        console.error('Migration failed:', err.message);
        process.exit(1);
    }
}

migrate();
