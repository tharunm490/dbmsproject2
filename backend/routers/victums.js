const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all victims
router.get('/', (req, res) => {
  const query = 'SELECT * FROM victims';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching victims:', err); // Debugging
      return res.status(500).json({ message: 'Error fetching victims' });
    }
    res.json(results);
  });
});

// POST a new victim
router.post('/', (req, res) => {
  console.log("POST /api/victims called with body:", req.body); // Debugging
  const { name, contact_info, crime_id } = req.body;

  if (!name || !contact_info || !crime_id) {
    console.error("Validation error: Missing required fields"); // Debugging
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO victims (name, contact_info, crime_id) VALUES (?, ?, ?)';
  db.query(query, [name, contact_info, crime_id], (err, results) => {
    if (err) {
      console.error("Database error:", err); // Debugging
      return res.status(500).json({ message: 'Error adding victim' });
    }
    res.status(201).json({ message: 'Victim added successfully', victim_id: results.insertId });
  });
});
// PUT (Update) an existing victim
router.put('/:id', (req, res) => {
  console.log("PUT /api/victims/:id called with body:", req.body); // Debugging
  const victim_id = req.params.id;
  const { name, contact_info, crime_id } = req.body;

  if (!name || !contact_info || !crime_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'UPDATE victims SET name = ?, contact_info = ?, crime_id = ? WHERE victim_id = ?';
  db.query(query, [name, contact_info, crime_id, victim_id], (err, results) => {
    if (err) {
      console.error("Database error:", err); // Debugging
      return res.status(500).json({ message: 'Error updating victim' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Victim not found' });
    }
    res.json({ message: 'Victim updated successfully' });
  });
});

// DELETE a victim
router.delete('/:id', (req, res) => {
  console.log("DELETE /api/victims/:id called with id:", req.params.id); // Debugging
  const victim_id = req.params.id;

  const query = 'DELETE FROM victims WHERE victim_id = ?';
  db.query(query, [victim_id], (err, results) => {
    if (err) {
      console.error("Database error:", err); // Debugging
      return res.status(500).json({ message: 'Error deleting victim' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Victim not found' });
    }
    res.json({ message: 'Victim deleted successfully' });
  });
});
module.exports = router;