import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div style={{ maxWidth: '900px', margin: '60px auto' }}>
            <h1 className="section-title" style={{ textAlign: 'center' }}>Contact Us</h1>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Have questions? We're here to help you 24/7.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                <div className="table-container">
                    <h2>Get in Touch</h2>
                    <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                        <div style={{ marginBottom: '15px' }}>
                            <label>Name</label>
                            <input type="text" className="input" required />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label>Email</label>
                            <input type="email" className="input" required />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label>Message</label>
                            <textarea className="input" style={{ height: '120px' }} required></textarea>
                        </div>
                        <button type="submit" className="button-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            <Send size={18} /> Send Message
                        </button>
                    </form>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div className="stat-card" style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Mail color="#ff385c" size={32} />
                        <div>
                            <h4 style={{ margin: 0 }}>Email</h4>
                            <p style={{ margin: 0, color: '#666' }}>support@hotelstay.com</p>
                        </div>
                    </div>
                    <div className="stat-card" style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Phone color="#ff385c" size={32} />
                        <div>
                            <h4 style={{ margin: 0 }}>Phone</h4>
                            <p style={{ margin: 0, color: '#666' }}>+1 (555) 000-1111</p>
                        </div>
                    </div>
                    <div className="stat-card" style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MapPin color="#ff385c" size={32} />
                        <div>
                            <h4 style={{ margin: 0 }}>Location</h4>
                            <p style={{ margin: 0, color: '#666' }}>123 Luxury Ave, Paradise City</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
