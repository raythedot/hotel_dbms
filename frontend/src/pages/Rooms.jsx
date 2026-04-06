import { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Filter } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import RoomTable from '../components/RoomTable';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/rooms');
            setRooms(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '40px 0 20px' }}>
                <h1 className="section-title" style={{ margin: 0 }}>
                    All Hotel Rooms
                </h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to="/rooms/add" className="button-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', width: 'auto' }}>
                        <Plus size={18} /> Add New Room
                    </Link>
                </div>
            </div>

            {loading ? (
                <p>Loading rooms...</p>
            ) : (
                <RoomTable rooms={rooms} fetchRooms={fetchRooms} />
            )}
        </div>
    );
};

export default Rooms;
