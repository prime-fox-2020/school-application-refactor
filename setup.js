// untuk built table

const pool = require('./config/connection')

const sqlStudents = `CREATE TABLE students (
        id serial PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        gender VARCHAR(50) NOT NULL,
        birth_date VARCHAR(50) NOT NULL
)`;


pool.query(sqlStudents, (err, result) => {
    if(err) {
        console.log(err)
    } else {
        console.log('succes')
    }
    pool.end()
})


