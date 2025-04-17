const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all case progress
router.get('/', (req, res) => {
  db.query('SELECT * FROM Case_Progress', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// GET a single progress entry by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Case_Progress WHERE progress_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }
    res.json(results[0]);
  });
});

// POST new progress
router.post('/', (req, res) => {
  const { crime_id, status_update, updated_by, date_updated } = req.body;

  if (!crime_id || !status_update || !updated_by || !date_updated) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO Case_Progress (crime_id, status_update, updated_by, date_updated) VALUES (?, ?, ?, ?)';
  db.query(sql, [crime_id, status_update, updated_by, date_updated], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, message: 'Progress added successfully!' });
  });
});

// PUT update progress
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { crime_id, status_update, updated_by, date_updated } = req.body;

  if (!crime_id || !status_update || !updated_by || !date_updated) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'UPDATE Case_Progress SET crime_id = ?, status_update = ?, updated_by = ?, date_updated = ? WHERE progress_id = ?';
  db.query(sql, [crime_id, status_update, updated_by, date_updated, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }
    res.json({ message: 'Progress updated successfully!' });
  });
});

// DELETE progress
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Case_Progress WHERE progress_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }
    res.json({ message: 'Progress deleted successfully!' });
  });
});

module.exports = router;