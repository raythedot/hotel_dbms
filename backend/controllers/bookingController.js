const db = require('../config/db');

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT b.*, r.room_number 
            FROM bookings b 
            JOIN rooms r ON b.room_id = r.id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a booking
exports.createBooking = async (req, res) => {
    const { guest_name, phone, room_id, check_in, check_out } = req.body;

    if (!guest_name || !phone || !room_id || !check_in || !check_out) {
        return res.status(400).json({ message: 'Required fields missing' });
    }

    try {
        // Check if room is already occupied
        const [[room]] = await db.execute('SELECT status FROM rooms WHERE id = ?', [room_id]);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        if (room.status === 'Occupied') {
            return res.status(400).json({ message: 'Room is already occupied' });
        }

        // Insert booking
        const [result] = await db.execute(
            'INSERT INTO bookings (guest_name, phone, room_id, check_in, check_out) VALUES (?, ?, ?, ?, ?)',
            [guest_name, phone, room_id, check_in, check_out]
        );

        // Update room status
        await db.execute('UPDATE rooms SET status = "Occupied" WHERE id = ?', [room_id]);

        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        // Get room_id before deleting
        const [[booking]] = await db.execute('SELECT room_id FROM bookings WHERE id = ?', [id]);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        // Delete booking
        await db.execute('DELETE FROM bookings WHERE id = ?', [id]);

        // Update room status back to Available
        await db.execute('UPDATE rooms SET status = "Available" WHERE id = ?', [booking.room_id]);

        res.json({ message: 'Booking deleted and room released' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
