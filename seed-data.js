const fs = require('fs')
const pool = require('./config/connection')

class Seeding {
    static students() {
        fs.readFile('./data/students.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                data = JSON.parse(data)
                let query = `INSERT INTO students (first_name, last_name, email, gender, birth_date) VALUES `
                // console.log(data)
                data.map(row => {
                    query += `('${row.first_name}', '${row.last_name}', '${row.email}', '${row.gender}', '${row.birth_date}'), `
                })
                query = query.slice(0, -2)
                // console.log(query)
                pool.query(query, (err, res) => {
                    if (err) {
                        throw err
                    } else {
                        console.log('Students table data seeding: OK')
                    }
                })
            }
        })
    }

    static teachers() {
        fs.readFile('./data/teachers.json', 'utf8', (err, data) => {
            if (err) {
                throw err
            } else {
                data = JSON.parse(data)
                let query = `INSERT INTO teachers (first_name, last_name, email, gender) VALUES `
                data.map(row => {
                    query += `('${row.first_name}', '${row.last_name}', '${row.email}', '${row.gender}'), `
                })
                query = query.slice(0, -2)
                pool.query(query, (err, res) => {
                    if (err) {
                        throw err
                    } else {
                        console.log('Teachers table data seeding: OK')
                    }
                })
            }
        })
    }

    static subjects() {
        fs.readFile('./data/subjects.json', 'utf8', (err, data) => {
            if (err) {
                throw err
            } else {
                data = JSON.parse(data)
                let query = `INSERT INTO subjects (subject_name) VALUES `
                data.map(row => {
                    query += `('${row.subject_name}'), `
                })
                query = query.slice(0, -2)
                pool.query(query, (err, res) => {
                    if (err) {
                        throw err
                    } else {
                        console.log('Subjects table data seeding: OK')
                    }
                })
            }
        })
    }
}

Seeding.students()
Seeding.teachers()
Seeding.subjects()