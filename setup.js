const pool = require('./config/connection')

pool.query(`
    CREATE TABLE students (
        id serial PRIMARY KEY,
        first_name VARCHAR (50),
        last_name VARCHAR (50),
        email VARCHAR (355),
        gender VARCHAR (50),
        birth_date DATE
    )
` , (err, res) => {
    if(err) {
        console.log(err);
    } else {
        console.log('succes')
    }
})

pool.query(`
    CREATE TABLE teachers (
        id serial PRIMARY KEY,
        first_name VARCHAR (50),
        last_name VARCHAR (50),
        email VARCHAR (355),
        gender VARCHAR (50)
    )
` , (err, res) => {
    if(err) {
        console.log(err);
    } else {
        console.log('succes')
    }
})

pool.query(`
    CREATE TABLE subjects (
        id serial PRIMARY KEY,
        subject_name VARCHAR (50)
    )
` , (err, res) => {
    if(err) {
        console.log(err);
    } else {
        console.log('succes')
    }
})