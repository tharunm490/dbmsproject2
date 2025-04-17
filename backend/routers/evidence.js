const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all evidence
router.get('/', (req, res) => {
  db.query('SELECT * FROM evidence', (err, results) => {
    if (err) {
      console.error('Error fetching evidence:', err); // Debugging
      return res.status(500).json({ message: 'Error fetching evidence' });
    }
    res.json(results);
  });
});

// POST new evidence
router.post('/', (req, res) => {
  const { description, collected_by, crime_id } = req.body;

  console.log("POST /api/evidence called with body:", req.body); // Debugging

  if (!description || !collected_by || !crime_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query(
    'INSERT INTO evidence (description, collected_by, crime_id) VALUES (?, ?, ?)',
    [description, collected_by, crime_id],
    (err, result) => {
      if (err) {
        console.error('Error adding evidence:', err); // Debugging
        return res.status(500).json({ message: 'Error adding evidence' });
      }
      res.status(201).json({ message: 'Evidence added', id: result.insertId });
    }
  );
});
// PUT update evidence
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { description, collected_by, crime_id } = req.body;

  console.log("PUT /api/evidence/:id called with body:", req.body); // Debugging

  if (!description || !collected_by || !crime_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query(
    'UPDATE evidence SET description = ?, collected_by = ?, crime_id = ? WHERE evidence_id = ?',
    [description, collected_by, crime_id, id],
    (err, result) => {
      if (err) {
        console.error('Error updating evidence:', err); // Debugging
        return res.status(500).json({ message: 'Error updating evidence' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Evidence not found' });
      }
      res.json({ message: 'Evidence updated successfully' });
    }
  );
});

// DELETE evidence
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM evidence WHERE evidence_id = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error('Error deleting evidence:', err); // Debugging
        return res.status(500).json({ message: 'Error deleting evidence' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Evidence not found' });
      }
      res.json({ message: 'Evidence deleted successfully' });
    }
  );
});

module.exports = router;