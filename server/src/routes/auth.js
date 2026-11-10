const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/database');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();
    db.run(
      'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
      [id, name, email, hashedPassword],
      function(err) {
        if (err) {
          return res.status(400).json({ msg: 'User already exists' });
        }
        const payload = { user: { id } };
        jwt.sign(
          payload,
          process.env.JWT_SECRET || 'terravolt_secret_key_change_in_prod',
          { expiresIn: '7d' },
          (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id, name, email } });
          }
        );
      }
    );
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'terravolt_secret_key_change_in_prod',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      }
    );
  });
});

module.exports = router;
