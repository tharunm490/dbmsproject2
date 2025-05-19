// const express = require('express');
// const router = express.Router();
// const db = require('../db'); // Ensure this path is correct

// router.post('/chat', (req, res) => {
//   const { message } = req.body;

//   // Debug log
//   console.log("Received message:", message);

//   if (!message) {
//     return res.status(400).json({ answer: 'Message is required' });
//   }

//   const lower = message.toLowerCase().trim();

//   // Category question
//   if (lower.includes('crime') && lower.includes('category')) {
//     db.query('SELECT DISTINCT category FROM Crimes', (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ answer: 'Database error' });
//       }
//       const categories = results.map(r => r.category);
//       return res.json({ answer: `Here are the crime categories: ${categories.join(', ')}` });
//     });

//   // Officer and station question
//   } else if (lower.includes('officer') && lower.includes('station')) {
//     db.query(`
//       SELECT U.name AS officer_name, U.job, P.name AS station_name
//       FROM Users U
//       JOIN Police_Stations P ON U.station_id = P.station_id
//     `, (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ answer: 'Database error' });
//       }
//       const list = results.map(r => `${r.officer_name} (${r.job}) - ${r.station_name}`).join('\n');
//       return res.json({ answer: `Here are the officers and their stations:\n${list}` });
//     });

//   // Fallback
//   } else {
//     return res.json({
//       answer:
//         'Sorry, I didn’t understand your question. Try asking about "crime categories" or "officers at stations".'
//     });
//   }
// });

// module.exports = router;
