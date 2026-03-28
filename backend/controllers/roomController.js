const db = require('../config/db');

// Get all rooms
exports.getAllRooms = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM rooms');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a room
exports.addRoom = async (req, res) => {
    const { room_number, room_type, price, status } = req.body;
    if (!room_number || !room_type || !price) {
        return res.status(400).json({ message: 'Required fields missing' });
    }
    try {
        const [result] = await db.execute(
            'INSERT INTO rooms (room_number, room_type, price, status) VALUES (?, ?, ?, ?)',
            [room_number, room_type, price, status || 'Available']
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a room
exports.updateRoom = async (req, res) => {
    const { id } = req.params;
    const { room_number, room_type, price, status } = req.body;
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
