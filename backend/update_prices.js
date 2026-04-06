const mysql = require('mysql2/promise');
require('dotenv').config();

async function updatePrices() {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'hotel_dbms'
        });
        
        // Update all rooms with a random price between 500 and 5000
        const query = 'UPDATE rooms SET price = ROUND(RAND() * (5000 - 500) + 500, 2)';
        const [result] = await db.execute(query);
        console.log(`Successfully updated prices for ${result.affectedRows} rooms to be between ₹500 and ₹5000.`);
        await db.end();
    } catch (error) {
        console.error("Error updating prices:", error);
    }
}

updatePrices();
