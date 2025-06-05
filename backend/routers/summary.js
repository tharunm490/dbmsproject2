const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/crime-summary/:id', (req, res) => {
    const crimeId = req.params.id;

    const query = `
        SELECT
    c.crime_id,
    c.criminal_name as name,
    c.description AS crime_description,
    c.date_reported,
    c.crime_name,
    c.category,

    ps.name AS station_name,
    ps.location AS station_location,
    ps.contact_number AS station_contact,

    u.name AS officer_name,
    u.job AS officer_job,

    s.name AS suspect_name,
    s.age AS suspect_age,

    v.name AS victim_name,
    v.contact_info AS victim_contact,

    w.name AS witness_name,
    w.contact_info AS witness_contact,

    e.description AS evidence_description,

    cp.status_update,
    cp.date_updated,

    ar.arrest_date,

    cc.case_status,
    cc.court_decision

FROM Crimes c
INNER JOIN Police_Stations ps ON c.station_id = ps.station_id
INNER JOIN Users u ON c.assigned_officer_id = u.user_id
INNER JOIN Suspects s ON c.crime_id = s.crime_id
INNER JOIN Victims v ON c.crime_id = v.crime_id
INNER JOIN Witnesses w ON c.crime_id = w.crime_id
INNER JOIN Evidence e ON c.crime_id = e.crime_id
INNER JOIN Case_Progress cp ON c.crime_id = cp.crime_id
INNER JOIN Arrests ar ON c.crime_id = ar.crime_id
INNER JOIN Court_Cases cc ON c.crime_id = cc.crime_id

WHERE c.crime_id = ?;
`;

    db.query(query, [crimeId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error retrieving crime report' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'No crime found' });
        }
        res.json(result[0]);
    });
});

module.exports = router;