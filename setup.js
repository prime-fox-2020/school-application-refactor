const pool = require('./config/connection')

const query = `
    CREATE TABLE students (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(125) NOT NULL,
        last_name VARCHAR(125) NOT NULL,
        email VARCHAR(125) NOT NULL,
        gender VARCHAR(125) NOT NULL
    )
`

const query2 = `
    CREATE TABLE teachers (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(125) NOT NULL,
        last_name VARCHAR(125) NOT NULL,
        email VARCHAR(125) NOT NULL,
        gender VARCHAR(125) NOT NULL
    )
`
const query3 = `
    CREATE TABLE subjects (
        id SERIAL PRIMARY KEY,
        subject_name VARCHAR(125) NOT NULL
    )
`

pool.query(query, (err) => {
  if (err) {throw err}
  else {console.log('setup students success!')}
})

pool.query(query2, (err) => {
    if (err) {throw err}
    else {console.log('setup teachers success!')}
})

pool.query(query3, (err) => {
    if (err) {throw err}
    else {console.log('setup subjects success!')}
})