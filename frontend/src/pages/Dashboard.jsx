import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bed, CheckCircle, XCircle, BookOpen } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        available: 0,
        occupied: 0,
        bookings: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            const roomsRes = await axios.get('/api/rooms');
            const bookingsRes = await axios.get('/api/bookings');
            
            const rooms = roomsRes.data;
            setStats({
                total: rooms.length,
                available: rooms.filter(r => r.status === 'Available').length,
                occupied: rooms.filter(r => r.status === 'Occupied').length,
                bookings: bookingsRes.data.length
            });
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="section-title">Admin Dashboard</h1>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">Total Rooms</div>
                    <div className="stat-value"><Bed size={24} /> {stats.total}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Available</div>
                    <div className="stat-value"><CheckCircle size={24} color="#1e7e34" /> {stats.available}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Occupied</div>
                    <div className="stat-value"><XCircle size={24} color="#d93025" /> {stats.occupied}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Total Bookings</div>
                    <div className="stat-value"><BookOpen size={24} color="#ff385c" /> {stats.bookings}</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '40px' }}>
                <div className="table-container">
                    <h3>Recent Activity</h3>
                    <p style={{ color: '#666' }}>All systems operational. Room occupancy at {stats.total ? Math.round((stats.occupied/stats.total)*100) : 0}%.</p>
                </div>
                <div className="table-container">
                    <h3>Quick Actions</h3>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <a href="/rooms/add" className="button-primary" style={{ textDecoration: 'none', textAlign: 'center' }}>+ Add Room</a>
                        <a href="/booking" className="button-primary" style={{ textDecoration: 'none', textAlign: 'center', background: '#222' }}>New Booking</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
