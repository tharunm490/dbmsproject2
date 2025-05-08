const express = require('express');
const router = express.Router();
const db = require('../db');

// Group by case_status and court_decision
router.get('/', (req, res) => {
  const sql = `
    SELECT case_status, court_decision, COUNT(*) AS count 
    FROM Court_Cases 
    GROUP BY case_status, court_decision
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching court case stats:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

module.exports = router;
