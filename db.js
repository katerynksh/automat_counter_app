const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'student_info_db',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

// Initialize database - create table if it doesn't exist
const initializeDatabase = async () => {
  console.log('🔄 Initializing database...');
  
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      short_name VARCHAR(50),
      surname VARCHAR(100) NOT NULL,
      specialty VARCHAR(150) NOT NULL,
      group_name VARCHAR(50) NOT NULL,
      year_of_study INTEGER NOT NULL CHECK (year_of_study >= 1 AND year_of_study <= 6),
      additional_info TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_students_surname ON students(LOWER(surname));
    CREATE INDEX IF NOT EXISTS idx_students_full_name ON students(LOWER(full_name));
    CREATE INDEX IF NOT EXISTS idx_students_short_name ON students(LOWER(short_name));
  `;

  try {
    await pool.query(createTableQuery);
    console.log('✅ Database table initialized successfully');
    
    // Check if table is empty and insert sample data
    const countResult = await pool.query('SELECT COUNT(*) FROM students');
    const count = parseInt(countResult.rows[0].count);
    
    console.log(`📊 Current student count: ${count}`);
    
    if (count === 0) {
      console.log('📝 Inserting sample data...');
      const insertSampleData = `
        INSERT INTO students (full_name, short_name, surname, specialty, group_name, year_of_study, additional_info)
        VALUES 
          ('Василь', 'Вася', 'Пупкін', 'Комп''ютерні науки', 'ІПЗс-25-1', 2, 'Любить програмування'),
          ('Катерина', 'Катя', 'Шерепера', 'Інженерія програмного забезпечення', 'ІПЗс-25-1', 1, 'Йожикова мама'),
          ('Анастасія', 'Настя', 'Шерепера', 'Облік та аудит', 'лалала-22-1', 3, 'Йожикова бабушка'),
          ('Інна', 'Інна', 'Лопушинська', 'Менеджмент', 'люлюлю', 4, 'Йожикова бабушка'),
          ('Богдан', 'Богдан', 'Лопушинський', 'Менеджмент', 'БПс-25-1', 2, 'Йожиковий папа');
      `;
      await pool.query(insertSampleData);
      console.log('✅ Sample data inserted');
    }
    
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    console.error('Full error:', error);
    throw error;
  }
};

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
  process.exit(-1);
});

module.exports = {
  pool,
  initializeDatabase,
  query: (text, params) => pool.query(text, params),
};