#!/bin/bash
# Terravolt 2.0 Startup Script
echo 'Starting Terravolt 2.0...'
cd server
npm install
node src/db/migrate.js
npm run dev &
cd ../client
npm install
npm run dev &
echo 'Server: http://localhost:5000'
echo 'Client: http://localhost:5173'
