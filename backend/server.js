const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crimeRoutes = require('./routers/crimes');
const policeStationsRoutes = require('./routers/policestations');
const usersRoutes = require('./routers/users');
const suspectsRoutes = require('./routers/supects');
const victimsRoutes = require('./routers/victums');
const witnessRoutes = require('./routers/witness');
const evidenceRoutes = require('./routers/evidence'); 
const case_progressRoutes = require('./routers/case_progress');
const arrestsRoutes = require('./routers/arrests');
const courtCasesRoutes = require('./routers/court_cases');
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
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});