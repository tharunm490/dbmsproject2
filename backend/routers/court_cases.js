const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all court cases
router.get('/', (req, res) => {
  db.query('SELECT * FROM Court_Cases', (err, results) => {
    if (err) {
      console.error('Error fetching court cases:', err);
      return res.status(500).json({ message: 'Error fetching court cases' });
    }
    res.json(results);
  });
});

// GET a single court case by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Court_Cases WHERE case_id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching court case:', err);
      return res.status(500).json({ message: 'Error fetching court case' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Court case not found' });
    }
    res.json(results[0]);
  });
});

// POST a new court case
router.post('/', (req, res) => {
  const { crime_id, case_status, court_decision } = req.body;

  if (!crime_id || !case_status || !court_decision) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO Court_Cases (crime_id, case_status, court_decision) VALUES (?, ?, ?)';
  db.query(sql, [crime_id, case_status, court_decision], (err, result) => {
    if (err) {
      console.error('Error adding court case:', err);
      return res.status(500).json({ message: 'Error adding court case' });
    }
    res.status(201).json({ id: result.insertId, message: 'Court case added successfully' });
  });
});

// PUT update a court case
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { crime_id, case_status, court_decision } = req.body;

  if (!crime_id || !case_status || !court_decision) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'UPDATE Court_Cases SET crime_id = ?, case_status = ?, court_decision = ? WHERE case_id = ?';
  db.query(sql, [crime_id, case_status, court_decision, id], (err, result) => {
    if (err) {
      console.error('Error updating court case:', err);
      return res.status(500).json({ message: 'Error updating court case' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Court case not found' });
    }
    res.json({ message: 'Court case updated successfully' });
  });
});

// DELETE a court case
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Court_Cases WHERE case_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting court case:', err);
      return res.status(500).json({ message: 'Error deleting court case' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Court case not found' });
    }
    res.json({ message: 'Court case deleted successfully' });
  });
});

module.exports = router;