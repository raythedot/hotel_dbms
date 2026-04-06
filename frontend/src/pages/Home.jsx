import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate('/rooms');
    };
    return (
        <div>
            <div className="hero">
                <div className="hero-content">
                    <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Find Your Next <br /> <span style={{ color: '#ff385c' }}>Perfect Stay</span></h1>
                    <p style={{ color: '#666', fontSize: '18px', marginBottom: '30px' }}>
                        Experience luxury and comfort in our handpicked rooms. <br />
                        Manage your bookings with ease and style.
                    </p>
                    <div className="search-box">
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <input type="date" className="input" />
                            <input type="date" className="input" />
                        </div>
                        <button className="button-primary" style={{ marginTop: '15px' }} onClick={handleSearch}>
                            Search Rooms
                        </button>
                    </div>
                </div>
                <div className="hero-image-container">
                    <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=2070" alt="Hotel Room" style={{ width: '500px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                </div>
            </div>

            <div className="features">
                <div className="feature-box">
                    <h3>Easy Booking</h3>
                    <p>Book your favorite room in just a few clicks with our seamless interface.</p>
                </div>
                <div className="feature-box">
                    <h3>Best Prices</h3>
                    <p>We offer competitive rates for premium luxury experiences.</p>
                </div>
                <div className="feature-box">
                    <h3>24/7 Support</h3>
                    <p>Our dedicated staff is always here to assist you with your stay.</p>
                </div>
            </div>

            <section>
                <h2 className="section-title">Explore Our Rooms</h2>
                <div className="card-grid">
                    <Link to="/rooms" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card-content">
                            <h3>Standard Single</h3>
                            <p className="price">₹2800 / night</p>
                            <span className="badge badge-available">Available</span>
                        </div>
                    </Link>
                    <Link to="/rooms" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card-content">
                            <h3>Deluxe Double</h3>
                            <p className="price">₹4900 / night</p>
                            <span className="badge badge-available">Available</span>
                        </div>
                    </Link>
                    <Link to="/rooms" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card-content">
                            <h3>Executive Suite</h3>
                            <p className="price">₹9500 / night</p>
                            <span className="badge badge-available">Available</span>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
