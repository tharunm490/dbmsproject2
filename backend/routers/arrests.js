const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all arrests
router.get('/', (req, res) => {
  db.query('SELECT * FROM Arrests', (err, results) => {
    if (err) {
      console.error('Error fetching arrests:', err);
      return res.status(500).json({ message: 'Error fetching arrests' });
    }
    res.json(results);
  });
});

// GET a single arrest by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Arrests WHERE arrest_id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching arrest:', err);
      return res.status(500).json({ message: 'Error fetching arrest' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Arrest not found' });
    }
    res.json(results[0]);
  });
});

// POST a new arrest
router.post('/', (req, res) => {
  const { crime_id, suspect_id, arresting_officer, arrest_date } = req.body;

  if (!crime_id || !suspect_id || !arresting_officer || !arrest_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO Arrests (crime_id, suspect_id, arresting_officer, arrest_date) VALUES (?, ?, ?, ?)';
  db.query(sql, [crime_id, suspect_id, arresting_officer, arrest_date], (err, result) => {
    if (err) {
      console.error('Error adding arrest:', err);
      return res.status(500).json({ message: 'Error adding arrest' });
    }
    res.status(201).json({ id: result.insertId, message: 'Arrest added successfully' });
  });
});

// PUT update an arrest
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { crime_id, suspect_id, arresting_officer, arrest_date } = req.body;

  if (!crime_id || !suspect_id || !arresting_officer || !arrest_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'UPDATE Arrests SET crime_id = ?, suspect_id = ?, arresting_officer = ?, arrest_date = ? WHERE arrest_id = ?';
  db.query(sql, [crime_id, suspect_id, arresting_officer, arrest_date, id], (err, result) => {
    if (err) {
      console.error('Error updating arrest:', err);
      return res.status(500).json({ message: 'Error updating arrest' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Arrest not found' });
    }
    res.json({ message: 'Arrest updated successfully' });
  });
});

// DELETE an arrest
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Arrests WHERE arrest_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting arrest:', err);
      return res.status(500).json({ message: 'Error deleting arrest' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Arrest not found' });
    }
    res.json({ message: 'Arrest deleted successfully' });
  });
});

module.exports = router;