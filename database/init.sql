-- Student Information System Database Setup
-- Run this script to set up the database manually (optional - app does this automatically)

-- Create database (run as postgres superuser)
-- CREATE DATABASE student_info_db;

-- Connect to the database
-- \c student_info_db

-- Create students table
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

-- Create indexes for faster searches
CREATE INDEX IF NOT EXISTS idx_students_surname ON students(surname);
CREATE INDEX IF NOT EXISTS idx_students_full_name ON students(full_name);

-- Insert sample data (optional)
INSERT INTO students (full_name, short_name, surname, specialty, group_name, year_of_study, additional_info)
VALUES 
  ('Василь', 'Вася', 'Пупкін', 'Комп''ютерні науки', 'ІПЗс-25-1', 2, 'Любить програмування'),
  ('Катерина', 'Катя', 'Шерепера', 'Інженерія програмного забезпечення', 'ІПЗс-25-1', 1, 'Йожикова мама'),
  ('Анастасія', 'Настя', 'Шерепера', 'Облік та аудит', 'лалала-22-1', 3, 'Йожикова бабушка'),
  ('Інна', 'Інна', 'Лопушинська', 'Менеджмент', 'люлюлю', 4, 'Йожикова бабушка'),
  ('Богдан', 'Богдан', 'Лопушинський', 'Менеджмент', 'БПс-25-1', 2, 'Йожиковий папа')
ON CONFLICT DO NOTHING;

-- Verify data
SELECT * FROM students;