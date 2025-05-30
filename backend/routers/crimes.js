const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection


// Get all crimes
router.get('/', (req, res) => {
  db.query('SELECT * FROM Crimes', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add a crime
router.post('/add', (req, res) => {
  console.log('Request Body:', req.body); // Debugging line

  const {
    description,
    date_reported,
    station_id,
    assigned_officer_id,
    criminal_name,
    crime_name,
  } = req.body;

  if (
    !description ||
    !date_reported ||
    !station_id ||
    !assigned_officer_id ||
    !criminal_name ||
    !crime_name
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.query(
    'INSERT INTO Crimes (description, date_reported, station_id, assigned_officer_id, criminal_name, crime_name) VALUES (?, ?, ?, ?, ?, ?)',
    [
      description,
      date_reported,
      station_id,
      assigned_officer_id,
      criminal_name,
      crime_name,
    ],
    (err, result) => {
      if (err) {
        console.error('Database Error:', err); // Debugging line
        return res.status(500).json(err);
      }
      res.json({ message: 'Crime added successfully', crime_id: result.insertId });
    }
  );
});
// Update a crime
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  console.log('Request Params:', req.params); // Debugging line
  console.log('Request Body:', req.body); // Debugging line

  const {
    description,
    date_reported,
    station_id,
    assigned_officer_id,
    criminal_name,
    crime_name,
  } = req.body;

  if (
    !description ||
    !date_reported ||
    !station_id ||
    !assigned_officer_id ||
    !criminal_name ||
    !crime_name
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.query(
    'UPDATE Crimes SET description = ?, date_reported = ?, station_id = ?, assigned_officer_id = ?, criminal_name = ?, crime_name = ? WHERE crime_id = ?',
    [
      description,
      date_reported,
      station_id,
      assigned_officer_id,
      criminal_name,
      crime_name,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error('Database Error:', err); // Debugging line
        return res.status(500).json(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Crime not found' });
      }
      res.json({ message: 'Crime updated successfully' });
    }
  );
});

// Delete a crime
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Crimes WHERE crime_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Crime not found' });
    res.json({ message: 'Crime deleted successfully' });
  });
});


module.exports = router;