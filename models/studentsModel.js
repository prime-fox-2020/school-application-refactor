const fs = require('fs')
const pool = require('../connection')

class StudentsModel {

    static readEditStudents (data, callback) {
        pool.query(`SELECT first_name, last_name, email FROM students
        WHERE id = ${data}`, (err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, res.rows)
            }
        })
    }

    static updateEditStudents (id, firstname, lastname, email, callback) {
        pool.query(`UPDATE students 
        SET first_name = '${firstname}', last_name = '${lastname}', email = '${email}'
        WHERE id = ${id}`, (err) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'Successfully deleted')
            }
        })
    }

    static readEmail (req, callback) {
        pool.query(`SELECT * FROM students WHERE email = '${req}'`, (err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, res.rows)
            }
        })
    }

    static read (callback) {
        pool.query(`SELECT * FROM students`, (err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, res.rows)
            }
        })
    }

    static update (data, callback) {
        pool.query(`
            INSERT INTO students (first_name, last_name, email, gender, birth_date)
            VALUES ('${data.firstname}', '${data.lastname}', '${data.email}', '${data.gender}', '${data.birth_date}')
            `, (err) => {
                if (err) {
                    callback(err, null)
                }
                else {
                    callback(null, 'Sucessfully input data')
                }
            }
        )
    }

    static delete (id, callback) {
        pool.query(`DELETE FROM students WHERE id = ${id}`, (err) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'Successfully deleted')
            }
        })
    }
}

module.exports = StudentsModel;