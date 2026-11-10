const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db/database');

router.post('/', (req, res) => {
  const { user_id, journey_id, title, note, photos, source_name, dest_name, distance_km } = req.body;
  const id = uuidv4();
  
  db.run(
    'INSERT INTO memories (id, user_id, journey_id, title, note, photos, source_name, dest_name, distance_km, journey_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime(\'now\')))',
    [id, user_id, journey_id, title, note, JSON.stringify(photos || []), source_name, dest_name, distance_km],
    function(err) {
      if (err) {
        return res.status(500).json({ msg: 'Error saving memory' });
      }
      res.json({ id, msg: 'Memory saved' });
    }
  );
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  db.all('SELECT * FROM memories WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ msg: 'Error fetching memories' });
    }
    res.json(rows.map(r => ({ ...r, photos: r.photos ? JSON.parse(r.photos) : [] })));
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM memories WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ msg: 'Error deleting memory' });
    }
    res.json({ msg: 'Memory deleted' });
  });
});

module.exports = router;
