# Terravolt 2.0

Your Personal Eco-Friendly Travel Companion

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation & Running

#### Windows
Double-click start.bat or run in terminal:
`ash
start.bat
`

#### Linux/Mac
`ash
chmod +x start.sh
./start.sh
`

### Manual Setup

#### Backend (Server)
`ash
cd server
npm install
node src/db/migrate.js
npm run dev
`
Server runs on http://localhost:5000

#### Frontend (Client)
`ash
cd client
npm install
npm run dev
`
Client runs on http://localhost:5173

## Features (Stage 1 - Implemented)

- Welcome screen with Create Account, Sign In, Guest access
- Mobile-first bottom navigation (Home, Explore, My Journeys, My Impact, Profile)
- Home screen with route planning shortcuts
- Explore screen with map (Leaflet), source/destination search, vehicle selection
- Journey memories screen (empty state)
- Environmental impact screen (empty state)
- Profile screen with settings
- Authentication (register/login)
- REST API backend with SQLite
- Route calculation with emission estimates
- Geocoding via Nominatim

## Tech Stack
- Frontend: HTML5, Tailwind CSS, JavaScript, Leaflet.js
- Backend: Node.js, Express.js
- Database: SQLite

## Environment Variables
Copy .env.example to server/.env and configure as needed.

## Notes
- This is Stage 1 implementation
- Live routing uses OSRM demo server
- Geocoding uses Nominatim
- Emission calculations use TERRAVOLT 1.0 demo coefficients
- Photos/images are placeholder/fallback in this stage
