const pool = require('./config/connection');

const query = `
  CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    gender VARCHAR(7) NOT NULL
  );

  CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL
  );

  CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    subject_name VARCHAR(50) NOT NULL
  )
`

pool.query(query, err => {
  if (err) throw err;
  else console.log('Tabel teachers, students, dan subjects berhasil dibuat');
  pool.end();
})
