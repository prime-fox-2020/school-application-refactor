const pool = require('./config/connection');
const fs = require('fs');

let queryTeachers = `
  INSERT INTO teachers (first_name, last_name, email, gender) VALUES 
`

let queryStudents = `
  INSERT INTO students (first_name, last_name, email, birth_date) VALUES 
`

let querySubjects = `
  INSERT INTO subjects (subject_name) VALUES 
`

fs.readFile('./teachers.json', 'utf8', (err, data) => {
  data = JSON.parse(data);

  queryTeachers += data.map(dat => `('${dat.first_name}', '${dat.last_name}', '${dat.email}', '${dat.gender}')`).join(', ');

  // console.log(queryTeachers)
  pool.query(queryTeachers, err => {
    if (err) throw err;
    else console.log('data teachers berhasil ditambahkan!');
  })
})

fs.readFile('./students.json', 'utf8', (err, data) => {
  data = JSON.parse(data);

  queryStudents += data.map(dat => `('${dat.first_name}', '${dat.last_name}', '${dat.email}', '${dat.birth_date}')`).join(', ');

  pool.query(queryStudents, err => {
    if (err) throw err;
    else console.log('data students berhasil ditambahkan!');
  })
})

fs.readFile('./subjects.json', 'utf8', (err, data) => {
  data = JSON.parse(data);

  querySubjects += data.map(dat => `('${dat.subject_name}')`).join(', ');
  
  pool.query(querySubjects, err => {
    if (err) throw err;
    else console.log('data subjects berhasil ditambahkan!');
    pool.end();
  })
})