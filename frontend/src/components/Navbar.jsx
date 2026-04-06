import { Link } from 'react-router-dom';
import { Home, LayoutDashboard, Bed, BookOpen, Mail } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">HotelVista</Link>
            <div className="nav-links">
                <Link to="/"><Home size={18} /> Home</Link>
                <Link to="/dashboard"><LayoutDashboard size={18} /> Dashboard</Link>
                <Link to="/rooms"><Bed size={18} /> Rooms</Link>
                <Link to="/booking"><BookOpen size={18} /> Bookings</Link>
                <Link to="/contact"><Mail size={18} /> Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;
