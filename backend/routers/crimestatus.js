const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to get crime stats grouped by crime name
router.get('/', (req, res) => {
  const sql = 'SELECT crime_name, COUNT(*) as count FROM Crimes GROUP BY crime_name';
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
