var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET info page. */
router.get('/', function(req, res, next) {
  console.log("req.method: " + req.method);
  console.log("req.path: " + req.path);
  console.log("req.url: " + req.url);
  console.log("req.baseUrl: " + req.baseUrl);
  
  res.render('info', { 
    title: 'Student Information Page',
    error: null,
    success: null
  });
});

/* POST - Create new student */
router.post('/', async function(req, res, next) {
  const { stud_name, stud_surname, stud_specialty, stud_group, stud_year, stud_additional } = req.body;
  
  console.log('📝 Creating new student...');
  console.log('Request body:', req.body);
  
  // Validation
  if (!stud_name || !stud_surname || !stud_specialty || !stud_group || !stud_year) {
    console.log('❌ Validation failed: Missing required fields');
    return res.render('info', {
      title: 'Student Information Page',
      error: 'All fields except Additional Info are required!',
      success: null
    });
  }

  const yearNum = parseInt(stud_year);
  if (isNaN(yearNum) || yearNum < 1 || yearNum > 6) {
    console.log('❌ Validation failed: Invalid year');
    return res.render('info', {
      title: 'Student Information Page',
      error: 'Year of Study must be between 1 and 6!',
      success: null
    });
  }

  try {
    // Generate short name (first word of full name)
    const shortName = stud_name.split(' ')[0];

    console.log('💾 Inserting into database...');
    
    // Insert student into database
    const insertQuery = `
      INSERT INTO students (full_name, short_name, surname, specialty, group_name, year_of_study, additional_info)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, full_name, surname;
    `;
    
    const result = await db.query(insertQuery, [
      stud_name,
      shortName,
      stud_surname,
      stud_specialty,
      stud_group,
      yearNum,
      stud_additional || ''
    ]);

    console.log('✅ Student created successfully:', result.rows[0]);
    console.log("Student Name: " + stud_name);
    console.log("Student Surname: " + stud_surname);
    console.log("Student Specialty: " + stud_specialty);
    console.log("Student Group: " + stud_group);
    console.log("Year of Study: " + stud_year);
    console.log("Additional Info: " + stud_additional);

    res.render('info', {
      title: 'Student Information Page',
      error: null,
      success: `Student ${result.rows[0].full_name} ${result.rows[0].surname} successfully added! ID: ${result.rows[0].id}`
    });

  } catch (error) {
    console.error('❌ Error creating student:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
    
    // Check for duplicate entry or other database errors
    if (error.code === '23505') { // Unique violation
      res.render('info', {
        title: 'Student Information Page',
        error: 'A student with this information already exists!',
        success: null
      });
    } else {
      res.render('info', {
        title: 'Student Information Page',
        error: `Database error: ${error.message}`,
        success: null
      });
    }
  }
});

module.exports = router;