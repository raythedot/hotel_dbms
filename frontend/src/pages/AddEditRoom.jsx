import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft } from 'lucide-react';

const AddEditRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        room_number: '',
        room_type: 'Single',
        price: '',
        status: 'Available'
    });

    useEffect(() => {
        if (isEdit) {
            axios.get(`/api/rooms/${id}`).then((res) => {
                setFormData(res.data);
            }).catch(err => {
                console.error("Error fetching room details:", err);
                alert("Failed to load room data.");
            });
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`/api/rooms/${id}`, formData);
                alert('Room updated successfully');
            } else {
                await axios.post('/api/rooms', formData);
                alert('Room added successfully');
            }
            navigate('/rooms');
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.message || 'Error saving roomData';
            alert(errorMsg);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto' }}>
            <button onClick={() => navigate('/rooms')} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '20px' }}>
                <ArrowLeft size={18} /> Back to Rooms
            </button>
            <div className="table-container">
                <h2 style={{ marginBottom: '20px' }}>{isEdit ? 'Edit Room' : 'Add New Room'}</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Room Number</label>
                        <input type="text" name="room_number" value={formData.room_number} onChange={handleChange} className="input" required />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Room Type</label>
                        <select name="room_type" value={formData.room_type} onChange={handleChange} className="input">
                            <option value="Single">Single</option>
                            <option value="Double">Double</option>
                            <option value="Suite">Suite</option>
                            <option value="Deluxe">Deluxe</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Price (₹)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="input" min="500" max="5000" step="0.01" required />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="input">
                            <option value="Available">Available</option>
                            <option value="Occupied">Occupied</option>
                        </select>
                    </div>
                    <button type="submit" className="button-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <Save size={18} /> {isEdit ? 'Update Room' : 'Add Room'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEditRoom;
