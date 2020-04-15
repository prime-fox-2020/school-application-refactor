const students = require('./students.json')
const teachers = require('./teachers.json')
const Subjects = require('./subjects.json')
const pool = require('./sinyal')




let query = `INSERT INTO murid (first_name, last_name, email, gender,birth_date) VALUES`


for(let i = 0; i < students.length; i++){
  query += `('${students[i].first_name}', '${students[i].last_name}', '${students[i].email}', '${students[i].gender}', '${students[i].birth_date}')${i < students.length-1 ? ', ' : ''}`
}


pool.query("DELETE * FROM murid WHERE id > 2", (err,data)=>{
  if(err)throw err
  console.log(data)
  pool.end()
})

// let guru = `INSERT INTO guru (first_name, last_name, email, gender) VALUES`


// for(let i = 1; i < teachers.length; i++){
//   guru += `('${teachers[i].first_name}', '${teachers[i].last_name}', '${teachers[i].email}', '${teachers[i].gender}')${i < teachers.length-1 ? ', ' : ''}`
// }

// pool.query(guru, (err,data)=>{
//   if(err)throw err
//   console.log(data)
  
// })





// let subjects = `INSERT INTO subjects (subject_name) VALUES`;

// for(let i = 0; i < Subjects.length; i++){
// subjects += `('${Subjects[i].subject_name}')${i <
//     Subjects.length - 1
//       ? ', '
//       : ''}`;
// }

// pool.query(subjects,  err =>{
//   if(err)throw err
//   console.log('berhasil seeding ke subjects')
//   pool.end()
// })