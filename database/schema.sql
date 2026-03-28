CREATE DATABASE IF NOT EXISTS hotel_db;
USE hotel_db;

CREATE TABLE IF NOT EXISTS rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_number VARCHAR(10) UNIQUE NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status ENUM('Available', 'Occupied') NOT NULL DEFAULT 'Available'
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    guest_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    room_id INT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Seed Data
INSERT IGNORE INTO rooms (room_number, room_type, price, status) VALUES
('101', 'Single', 50.00, 'Available'),
('102', 'Double', 80.00, 'Available'),
('201', 'Suite', 150.00, 'Available'),
('202', 'Deluxe', 120.00, 'Available');
