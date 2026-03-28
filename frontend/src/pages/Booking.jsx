import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import BookingForm from '../components/BookingForm';

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('/api/bookings');
            setBookings(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this booking? The room will be set back to Available.')) {
            try {
                await axios.delete(`/api/bookings/${id}`);
                fetchBookings();
                alert('Booking deleted successfully');
            } catch (error) {
                console.error(error);
                alert('Error deleting booking');
            }
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div>
            <h1 className="section-title">Manage Bookings</h1>
            <BookingForm fetchBookings={fetchBookings} />

            <div className="table-container">
                <h2>Current Bookings</h2>
                {loading ? (
                    <p>Loading bookings...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Guest</th>
                                <th>Phone</th>
                                <th>Room</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.guest_name}</td>
                                    <td>{booking.phone}</td>
                                    <td>Room {booking.room_number}</td>
                                    <td>{new Date(booking.check_in).toLocaleDateString()}</td>
                                    <td>{new Date(booking.check_out).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleDelete(booking.id)} style={{ background: '#fce8e8', color: '#d93025', border: 'none', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Booking;
