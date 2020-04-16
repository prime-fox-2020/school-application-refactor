const pool = require('./config/connection');

const teachersTableSql = `
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50),
    gender VARCHAR(6)
);
`;

const studentsTableSql = `
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50),
    gender VARCHAR(6),
    birth_date VARCHAR(20)
);
`;

const subjectsTableSql = `
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    subject_name VARCHAR(50)
);
`;

pool.query(teachersTableSql, (err, data) => {
    if (err) {
        throw err;
    } else {
        console.log('Table "teachers" created successfully');
        pool.query(studentsTableSql, (err, data) => {
            if (err) {
                throw err;
            } else {
                console.log('Table "students" created successfully');
                pool.query(subjectsTableSql, (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log('Table "subjects" created successfully');
                        pool.end();
                    }
                });
            }
        });
    }
}); 