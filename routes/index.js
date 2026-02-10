var express = require('express');
var router = express.Router();
const { pool } = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Student Info' });
});

/* GET student search API endpoint */
router.get('/api/search', async function(req, res, next) {
  const searchTerm = req.query.q;
  
  console.log('🔍 Search request:', searchTerm);
  
  if (!searchTerm) {
    return res.json({ error: 'Search term is required' });
  }

  try {
    // Search by full name, short name, or surname (case-insensitive)
    // First try exact match, then partial match
    const searchQuery = `
      SELECT id, full_name, short_name, surname, specialty, group_name, year_of_study, additional_info
      FROM students
      WHERE 
        LOWER(full_name) = LOWER($1) OR
        LOWER(short_name) = LOWER($1) OR
        LOWER(surname) = LOWER($1) OR
        LOWER(full_name || ' ' || surname) = LOWER($1) OR
        LOWER(surname || ' ' || full_name) = LOWER($1) OR
        LOWER(short_name || ' ' || surname) = LOWER($1) OR
        LOWER(surname || ' ' || short_name) = LOWER($1) OR
        -- Partial matches
        LOWER(full_name) LIKE LOWER($2) OR
        LOWER(short_name) LIKE LOWER($2) OR
        LOWER(surname) LIKE LOWER($2) OR
        LOWER(full_name || ' ' || surname) LIKE LOWER($2) OR
        LOWER(surname || ' ' || full_name) LIKE LOWER($2)
      ORDER BY 
        CASE 
          WHEN LOWER(full_name) = LOWER($1) THEN 1
          WHEN LOWER(surname) = LOWER($1) THEN 2
          WHEN LOWER(short_name) = LOWER($1) THEN 3
          ELSE 4
        END
      LIMIT 1;
    `;

    const result = await pool.query(searchQuery, [searchTerm, `%${searchTerm}%`]);

    console.log('📊 Search results:', result.rows.length);

    if (result.rows.length === 0) {
      console.log('❌ Student not found');
      return res.json({ error: 'Student not found' });
    }

    console.log('✅ Found student:', result.rows[0].full_name, result.rows[0].surname);
    // Return the first match
    res.json(result.rows[0]);

  } catch (error) {
    console.error('❌ Error searching for student:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ error: 'An error occurred while searching' });
  }
});

module.exports = router;