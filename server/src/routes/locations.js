const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: { q, format: 'json', limit: 5 },
      headers: { 'User-Agent': 'Terravolt-2.0' }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ msg: 'Error searching locations' });
  }
});

router.get('/reverse', async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: { lat, lon, format: 'json' },
      headers: { 'User-Agent': 'Terravolt-2.0' }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ msg: 'Error reverse geocoding' });
  }
});

module.exports = router;
