
const express = require('express');
const router = express.Router();
const db = require('../db'); // Assumes you have db.js setup
const { sendComplaintConfirmation, notifyAdmins } = require('../mail/mailer');

// ✅ Submit Complaint (with email + location + admin alerts)
router.post('/submitComplaint', async (req, res) => {
  const { username, email, complaintText, category, location } = req.body;

  if (!username || !email || !complaintText || !category || !location) {
    return res.status(400).send('All fields are required');
  }

  const sql = `
    INSERT INTO Crime_Complaints (username, email, category, complaint_text, location)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [username, email, category, complaintText, location], async (err) => {
    if (err) {
      console.error('DB Insert Error:', err);
      return res.status(500).send('Error inserting complaint');
    }

    try {
      // ✅ Send user confirmation email
      await sendComplaintConfirmation(email, username, complaintText, location);

      // ✅ Notify admin team (you and your friends)
      await notifyAdmins(username, email, category, complaintText, location);

      res.status(200).json({ message: 'Complaint submitted and emails sent.' });
    } catch (emailErr) {
      console.error('Email Send Error:', emailErr);
      res.status(500).json({ error: 'Complaint saved, but email sending failed.' });
    }
  });
});

// ✅ View Related Complaints (Filtered by user and category)
router.get('/relatedCrimes', (req, res) => {
  const { category, username } = req.query;

  if (!category || !username) {
    return res.status(400).send('Category and username are required');
  }

  const sql = `
    SELECT id, username, email, category, complaint_text, location,
           DATE_FORMAT(date_submitted, "%Y-%m-%d %H:%i:%s") as date_submitted
    FROM Crime_Complaints
    WHERE category = ? AND username = ?
  `;

  db.query(sql, [category, username], (err, results) => {
    if (err) return res.status(500).send('Error retrieving complaints');
    res.json(results);
  });
});

// ✅ Delete Complaint by ID (Only if username matches)
router.delete('/deleteComplaint/:id', (req, res) => {
  const complaintId = req.params.id;
  const username = req.query.username;

  if (!username) {
    return res.status(400).send('Username is required');
  }

  const sql = 'DELETE FROM Crime_Complaints WHERE id = ? AND username = ?';
  db.query(sql, [complaintId, username], (err, result) => {
    if (err) return res.status(500).send('Error deleting complaint');
    if (result.affectedRows === 0) {
      return res.status(404).send('Complaint not found or unauthorized');
    }
    res.sendStatus(200);
  });
});

module.exports = router;
