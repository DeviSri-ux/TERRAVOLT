const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db/database');

router.post('/', (req, res) => {
  const { user_id, is_guest, source_name, source_lat, source_lng, dest_name, dest_lat, dest_lng, distance_km, vehicle_type, emissions_g } = req.body;
  const id = uuidv4();
  
  db.run(
    'INSERT INTO journeys (id, user_id, is_guest, source_name, source_lat, source_lng, dest_name, dest_lat, dest_lng, distance_km, vehicle_type, emissions_g) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [id, user_id || null, is_guest ? 1 : 0, source_name, source_lat, source_lng, dest_name, dest_lat, dest_lng, distance_km, vehicle_type, emissions_g],
    function(err) {
      if (err) {
        return res.status(500).json({ msg: 'Error saving journey' });
      }
      res.json({ id, msg: 'Journey saved' });
    }
  );
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  db.all('SELECT * FROM journeys WHERE user_id = ? ORDER BY completed_at DESC', [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ msg: 'Error fetching journeys' });
    }
    res.json(rows);
  });
});

module.exports = router;
