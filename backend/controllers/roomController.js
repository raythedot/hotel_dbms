const db = require('../config/db');

// Get all rooms
exports.getAllRooms = async (req, res) => {
    try {
        let query = 'SELECT * FROM rooms';
        const [rows] = await db.execute(query);
        res.json(rows);
    } catch (error) {
        console.error('DATABASE ERROR (getAllRooms):', error.message);
        res.status(500).json({ message: 'Database Error: ' + error.message });
    }
};

// Get a room by ID
exports.getRoomById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM rooms WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('DATABASE ERROR (getRoomById):', error.message);
        res.status(500).json({ message: 'Database Error: ' + error.message });
    }
};

// Add a room
exports.addRoom = async (req, res) => {
    const { room_number, room_type, price, status } = req.body;
    if (!room_number || !room_type || !price) {
        return res.status(400).json({ message: 'Required fields missing' });
    }
    if (price < 500 || price > 5000) {
        return res.status(400).json({ message: 'Price must be between 500 and 5000' });
    }
    try {
        const [result] = await db.execute(
            'INSERT INTO rooms (room_number, room_type, price, status) VALUES (?, ?, ?, ?)',
            [room_number, room_type, price, status || 'Available']
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        console.error('DATABASE ERROR (addRoom):', error.message);
        res.status(500).json({ message: 'Database Error: ' + error.message });
    }
};

// Update a room
exports.updateRoom = async (req, res) => {
    const { id } = req.params;
    const { room_number, room_type, price, status } = req.body;
    
    if (price < 500 || price > 5000) {
        return res.status(400).json({ message: 'Price must be between 500 and 5000' });
    }

    try {
        await db.execute(
            'UPDATE rooms SET room_number = ?, room_type = ?, price = ?, status = ? WHERE id = ?',
            [room_number, room_type, price, status, id]
        );
        res.json({ message: 'Room updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM rooms WHERE id = ?', [id]);
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
