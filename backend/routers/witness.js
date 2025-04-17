const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all witnesses
router.get('/', (req, res) => {
  db.query('SELECT * FROM Witnesses', (err, results) => {
    if (err) {
      console.error('Error fetching witnesses:', err); // Debugging
      return res.status(500).json({ message: 'Error fetching witnesses' });
    }
    res.json(results);
  });
});

// POST new witness
router.post('/', (req, res) => {
  const { name, contact_info, crime_id } = req.body;

  if (!name || !contact_info || !crime_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO Witnesses (name, contact_info, crime_id) VALUES (?, ?, ?)';
  db.query(query, [name, contact_info, crime_id], (err, result) => {
    if (err) {
      console.error('Error adding witness:', err); // Debugging
      return res.status(500).json({ message: 'Error adding witness' });
    }
    res.status(201).json({ message: 'Witness added successfully', witness_id: result.insertId });
  });
});

// PUT update Witnesses by ID
router.put('/:id', (req, res) => {
  const { name, contact_info, crime_id } = req.body;
  const { id } = req.params;

  if (!name || !contact_info || !crime_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'UPDATE Witnesses SET name = ?, contact_info = ?, crime_id = ? WHERE witness_id = ?';
  db.query(query, [name, contact_info, crime_id, id], (err, result) => {
    if (err) {
      console.error('Error updating witness:', err); // Debugging
      return res.status(500).json({ message: 'Error updating witness' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Witness not found' });
    }
    res.json({ message: 'Witness updated successfully' });
  });
});

// DELETE witness by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Witnesses WHERE witness_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting witness:', err); // Debugging
      return res.status(500).json({ message: 'Error deleting witness' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Witness not found' });
    }
    res.json({ message: 'Witness deleted successfully' });
  });
});

module.exports = router;