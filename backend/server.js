const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crimeRoutes = require('./routers/crimes');
const policeStationsRoutes = require('./routers/policestations');
const usersRoutes = require('./routers/users');
const suspectsRoutes = require('./routers/suspects');
const victimsRoutes = require('./routers/victims');
const witnessRoutes = require('./routers/witness');
const evidenceRoutes = require('./routers/evidence'); 
const case_progressRoutes = require('./routers/case_progress');
const arrestsRoutes = require('./routers/arrests');
const courtCasesRoutes = require('./routers/court_cases');
const crimeStatsRoutes = require('./routers/crimestatus'); // Import the crime stats route
const courtCaseStatsRoutes = require('./routers/courtstatus');
const complaintRoutes = require('./routers/complaints');
// const chatbotRoutes = require('./routers/chatbot'); // Import the chatbot route
const summaryRoutes = require('./routers/summary');
const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use('/api/crimes', crimeRoutes); 
app.use('/api/police-stations', policeStationsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/suspects', suspectsRoutes);
app.use('/api/victims', victimsRoutes);
app.use('/api/witness', witnessRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/case_progress', case_progressRoutes);
app.use('/api/arrests', arrestsRoutes);
app.use('/api/court_cases', courtCasesRoutes);
app.use('/api/crime-stats', crimeStatsRoutes); // Use the crime stats route
app.use('/api/court-case-stats', courtCaseStatsRoutes);
app.use('/api', complaintRoutes);
app.use('/api', summaryRoutes);
// app.use('/api', chatbotRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});