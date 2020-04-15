const fs = require('fs')
const pool = require('../connection')

class StudentsModel {
    static getStudents (callback) {
        this.openFile ((err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }

    static studentPost (newStudent, callback) {
        this.writeFile(newStudent,(err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, res)
            }
        })
    }

    static editStudents (data, callback) {
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

    static postEditStudents (id, firstname, lastname, email, callback) {
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

    static getEmail (req, callback) {
        pool.query(`SELECT * FROM students WHERE email = '${req}'`, (err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, res.rows)
            }
        })
    }

    static openFile (callback) {
        pool.query(`SELECT * FROM students`, (err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, res.rows)
            }
        })
    }

    static writeFile (data, callback) {
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

    static deleteStudent (id, callback) {
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