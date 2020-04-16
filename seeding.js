const pool = require('./config/connection')
const fs = require('fs')

let query = `INSERT INTO students (first_name, last_name, email, gender) VALUES `

fs.readFile('./db/students.json', (err, results) => {
  
  query += JSON.parse(results).map(el => `('${el.first_name}', '${el.last_name}', '${el.email}', '${el.gender}')`).join(', ')
  
//   console.log(query)
  pool.query(query, (err) => {
      if (err) {throw err}
      else {
        console.log(`Seeding success!`)
      }
  })
})
