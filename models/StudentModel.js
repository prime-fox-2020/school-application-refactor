const pool = require('../config/connection')

class StudentModel {
    static get(callback) {
        let query = `
            SELECT
                *
            FROM
                Student
        `
        pool.query(query, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
    }

    static add(first_name, last_name, email, gender, birth_date, callback1) {
        // let arrayStudent = []
        // arrayStudent.push(`('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.gender}', '${req.body.birth_date}')`)
        // query += arrayStudent.join(', ')
        pool.query(`
        INSERT INTO 
            student ("first_name", "last_name", "email", "gender", "birth_date") 
        VALUES 
            ($1, $2, $3, $4, $5)`, [first_name, last_name, email, gender, birth_date], (err, res) => {
            if (err) {
                callback1(err, null)
            } else {
                callback1(null, true)
            }
        })
        // callback(req.body.first_name)
    }

    static editForm(params, callback2) {
        let query = `
        SELECT
            *
        FROM
            student
        WHERE
            id = ${params}
        `
        pool.query(query, (err, data) => {
            if (err) {
                callback2(err, null)
            } else {
                // console.log(params)
                callback2(null, data.rows)
            }
        })
    }

    static edit(first_name, last_name, email, gender, birth_date, params, callback3) {
        pool.query(`
                UPDATE 
                    student 
                SET
                    "first_name" = $1, "last_name" = $2, "email" = $3, "gender" = $4, "birth_date" = $5 
                WHERE
                    "id" = $6`, [first_name, last_name, email, gender, birth_date, params], (err, res) => {
            if (err) {
                callback3(err, null)
            } else{
                callback3(null, true)
            }
        })
    }

    static delete(params, callback) {
        let query = `
            DELETE FROM student
            WHERE id = ${params}
            `
        pool.query(query, (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        })
    }

}

module.exports = StudentModel