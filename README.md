# Hotel Room Management System - Setup Instructions

Follow these steps to get the project running on your local machine.

## Prerequisites
- Node.js (v14 or higher)
- MySQL Server

## 1. Database Setup
1. Open your MySQL client (e.g., MySQL Workbench or Command Line).
2. Execute the script located in `database/schema.sql`.
3. This will create the `hotel_db` database and the necessary tables with some initial data.

## 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Open `.env` and update the `DB_USER` and `DB_PASSWORD` with your MySQL credentials.
4. Start the server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

## 3. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`.

## Project Features
- **Modern Dashboard**: View statistics on occupancy and bookings.
- **Room Management**: Add, Edit, and Delete hotel rooms.
- **Booking System**: Create guest bookings and automatically update room availability.
- **Responsive UI**: Clean, professional design with a luxury hotel aesthetic.
