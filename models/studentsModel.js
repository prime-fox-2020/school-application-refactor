const fs = require("fs")
const pool = require("../connection/config")
const Convert = require("../convertTime")


class studentsModels {
    static showStudents(callback) {

        const query = `
            SELECT * FROM students
            ORDER BY id ASC
        `

        pool.query(query, (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                for (let i = 0; i < results.rows.length; i++) {
                    results.rows[i].birth_date = Convert.toIndo(results.rows[i].birth_date.toString().slice(4, 15))
                    // console.log(results.rows[i])
                }
                callback(null, results.rows)
            }
        })
    }

    static findStudentByEmail(email, callback) {
        const query = `
            SELECT * FROM students
            WHERE email = $1
        `
        // console.log(email)
        let params = [email]
        pool.query(query, params, (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                for (let i = 0; i < results.rows.length; i++) {
                    results.rows[i].birth_date = Convert.toIndo(results.rows[i].birth_date.toISOString().slice(4, 15))
                    // console.log(results.rows[i])
                }
                callback(null, results.rows)
            }
        })
    }

    static postAddStudentsData(req, callback) {
        // console.log(req)
        const query = `
                INSERT INTO students (first_name,last_name,email,gender,birth_date) VALUES ($1,$2,$3,$4,$5)
        `
        const error = this.validation(req)

        if (error.length > 0) {
            callback(error, null)
        } else {
            let params = [req.first_name, req.last_name, req.email, req.gender, req.birthdate]
            pool.query(query, params, (err, results) => {
                if (err) {
                    callback(err, null)
                } else {
                    callback(null, results.rows)
                }
            })
        }

    }

    static editStudentById(id, error, callback) {

        const query = `
        SELECT * FROM students WHERE id = $1
        `
        let params = [id]
        pool.query(query, params, (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                results.rows[0].birth_date = Convert.toISOIndo(results.rows[0].birth_date.toString().slice(4, 15))
                // console.log(results.rows[0])
                if (error == undefined) {
                    results.rows[0].error = false
                    callback(null, { student: results.rows[0] })
                } else {
                    results.rows[0].error = error
                    callback(null, { student: results.rows[0] })
                }
            }
        })

    }

    static postAfterEdit(req, id, callback) {
        // console.log(id)
        const query = `
                UPDATE students SET first_name = $1, last_name = $2, email = $3, gender = $4, birth_date = $5 WHERE id = $6
        `
        const error = this.validation(req)

        if (error.length > 0) {
            callback(error, null)
        } else {
            let params = [req.first_name, req.last_name, req.email, req.gender, req.birthdate, id]
            pool.query(query, params, (err, results) => {
                if (err) {
                    callback(err, null)
                } else {
                    callback(null, results.rows)
                }
            })
        }
    }

    static deleteStudentsData(id, callback) {
        const query = `
            DELETE FROM students WHERE id = $1
        `

        let params = [id]
        pool.query(query, params, (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results.rows)
            }
        })
    }

    static validation(req){
        const error = []
        const birth = req.birthdate
        if (!req.first_name) {
            error.push('First name is required')
        }
        if (!req.last_name) {
            error.push('Last name is required')
        }
        if (!req.email) {
            error.push('Email is required')
        }
        if (!birth) {
            error.push('Date of birth is required')
        } else if (birth[4] != "-" || birth[7] != "-" ||
            (birth[5] + birth[6]) > 12 || (birth[5] + birth[6]) < 0 ||
            (birth[8] + birth[9]) > 31 || (birth[8] + birth[9]) < 0) {
            error.push("Wrong Date format")
        }
        return error
    }
}

module.exports = studentsModels