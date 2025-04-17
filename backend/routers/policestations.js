const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have db.js setup with mysql connection

// Get all police stations
router.get('/', (req, res) => {
  db.query('SELECT * FROM Police_Stations', (err, results) => {
    if (err) {
      console.error('Error fetching police stations:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Get a single police station by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Police_Stations WHERE station_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.length === 0) return res.status(404).json({ error: 'Station not found' });
    res.json(result[0]);
  });
});

// Add a new police station
router.post('/', (req, res) => {
  const { station_id, name, location, contact_number } = req.body;
  db.query(
    'INSERT INTO Police_Stations (station_id, name, location, contact_number) VALUES (?, ?, ?, ?)',
    [station_id, name, location, contact_number],
    (err, result) => {
      if (err) {
        console.error('Error inserting police station:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Police station added successfully' });
    }
  );
});

// Update an existing police station
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name, location, contact_number } = req.body;
  db.query(
    'UPDATE Police_Stations SET name = ?, location = ?, contact_number = ? WHERE station_id = ?',
    [name, location, contact_number, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Station not found' });
      res.json({ message: 'Police station updated successfully' });
    }
  );
});

// Delete a police station
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Police_Stations WHERE station_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Station not found' });
    res.json({ message: 'Police station deleted successfully' });
  });
});

module.exports = router;
