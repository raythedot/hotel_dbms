import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoomTable = ({ rooms, fetchRooms }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            try {
                await axios.delete(`/api/rooms/${id}`);
                fetchRooms();
                alert('Room deleted successfully');
            } catch (error) {
                console.error(error);
                alert('Error deleting room');
            }
        }
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Room No.</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.room_number}</td>
                            <td>{room.room_type}</td>
                            <td>${room.price}</td>
                            <td>
                                <span className={`badge ${room.status === 'Available' ? 'badge-available' : 'badge-occupied'}`}>
                                    {room.status}
                                </span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => navigate(`/rooms/edit/${room.id}`)} className="button-secondary" style={{ background: '#eee', border: 'none', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(room.id)} className="button-secondary" style={{ background: '#fce8e8', color: '#d93025', border: 'none', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomTable;
