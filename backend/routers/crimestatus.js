const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to get crime stats grouped by major crime
router.get('/', (req, res) => {
  const sql = 'SELECT major_crime, COUNT(*) as count FROM Crimes GROUP BY major_crime';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching crime stats:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});
router.get('/test', (req, res) => {
  res.send('Test route working!');
});


module.exports = router;
