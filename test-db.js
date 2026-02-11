const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'student_info_db',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('Config:', {
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'student_info_db',
      port: process.env.DB_PORT || 5432,
    });

    const client = await pool.connect();
    console.log('✅ Connected to database!');

    // Test if table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'students'
      );
    `);
    console.log('Table exists:', tableCheck.rows[0].exists);

    // Count students
    const count = await client.query('SELECT COUNT(*) FROM students;');
    console.log('Total students:', count.rows[0].count);

    // Show all students
    const students = await client.query('SELECT * FROM students;');
    console.log('\nAll students:');
    console.table(students.rows);

    client.release();
    await pool.end();
  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testConnection();