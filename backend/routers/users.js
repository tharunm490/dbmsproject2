const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// GET all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error occurred' });
    }
    res.status(200).json(results);
  });
});

// GET a single user by user_id
router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;
  db.query('SELECT * FROM Users WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error occurred' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(results[0]);
  });
});

// POST (Create) a new user
router.post('/', (req, res) => {
  const { name, job, station_id } = req.body;
  const query = 'INSERT INTO Users (name, job, station_id) VALUES (?, ?, ?)';
  db.query(query, [name, job, station_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error occurred' });
    }
    res.status(201).json({
      message: 'User created successfully',
      user_id: results.insertId,
    });
  });
});

// PUT (Update) a user's information by user_id
router.put('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { name, job, station_id } = req.body;
  const query = 'UPDATE Users SET name = ?, job = ?, station_id = ? WHERE user_id = ?';
  db.query(query, [name, job, station_id, user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error occurred' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  });
});

// DELETE a user by user_id
router.delete('/:user_id', (req, res) => {
  const { user_id } = req.params;
  db.query('DELETE FROM Users WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error occurred' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
});

module.exports = router;