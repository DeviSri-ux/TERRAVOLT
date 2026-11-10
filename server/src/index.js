const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow TERRAVOLT frontend to connect from laptop and mobile devices
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../uploads'))
);

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/routes', require('./routes/routes'));
app.use('/api/journeys', require('./routes/journeys'));
app.use('/api/photos', require('./routes/photos'));
app.use('/api/memories', require('./routes/memories'));

// Test route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Terravolt 2.0 API running'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ' + PORT);
});