const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all suspects
router.get("/", (req, res) => {
  db.query("SELECT * FROM Suspects", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST a new suspect
router.post("/", (req, res) => {
  const { name, age, crime_id } = req.body;
  const sql = "INSERT INTO Suspects (name, age, crime_id) VALUES (?, ?, ?)";
  db.query(sql, [name, age, crime_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Suspect added", id: result.insertId });
  });
});

// PUT update suspect
router.put("/:id", (req, res) => {
  const { name, age, crime_id } = req.body;
  const sql = "UPDATE Suspects SET name = ?, age = ?, crime_id = ? WHERE suspect_id = ?";
  db.query(sql, [name, age, crime_id, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Suspect updated" });
  });
});

// DELETE suspect
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM Suspects WHERE suspect_id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Suspect deleted" });
  });
});

module.exports = router;