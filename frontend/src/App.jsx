import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import AddEditRoom from './pages/AddEditRoom';
import Booking from './pages/Booking';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/add" element={<AddEditRoom />} />
          <Route path="/rooms/edit/:id" element={<AddEditRoom />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <footer className="footer">
        <p>&copy; 2026 Hotel Management System. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
