import { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen } from 'lucide-react';

const BookingForm = ({ fetchBookings }) => {
    const [rooms, setRooms] = useState([]);
    const [formData, setFormData] = useState({
        guest_name: '',
        phone: '',
        room_id: '',
        check_in: '',
        check_out: ''
    });

    useEffect(() => {
        // Fetch only available rooms
        axios.get('/api/rooms').then(res => {
            setRooms(res.data.filter(r => r.status === 'Available'));
        });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/bookings', formData);
            alert('Booking created successfully!');
            setFormData({ guest_name: '', phone: '', room_id: '', check_in: '', check_out: '' });
            fetchBookings();
            // Refetch rooms to update availability list
            axios.get('/api/rooms').then(res => {
                setRooms(res.data.filter(r => r.status === 'Available'));
            });
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Error creating booking');
        }
    };

    return (
        <div className="table-container" style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '20px' }}>Create New Booking</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div>
                    <label>Guest Name</label>
                    <input type="text" name="guest_name" value={formData.guest_name} onChange={handleChange} className="input" required />
                </div>
                <div>
                    <label>Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="input" required />
                </div>
                <div>
                    <label>Select Room</label>
                    <select name="room_id" value={formData.room_id} onChange={handleChange} className="input" required>
                        <option value="">Choose a room</option>
                        {rooms.map(room => (
                            <option key={room.id} value={room.id}>{room.room_number} - {room.room_type} (${room.price})</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Check In</label>
                    <input type="date" name="check_in" value={formData.check_in} onChange={handleChange} className="input" required />
                </div>
                <div>
                    <label>Check Out</label>
                    <input type="date" name="check_out" value={formData.check_out} onChange={handleChange} className="input" required />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button type="submit" className="button-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <BookOpen size={18} /> Book Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
