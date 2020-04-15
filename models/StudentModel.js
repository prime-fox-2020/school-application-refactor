const pool = require('../config/connection')

class StudentModel {
    static get(callback) {
        let query = `
        SELECT * FROM "students"
        `
        pool.query(query, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        })
    }

    static add(first_name, last_name, email, gender, birth_date, callback) {
        pool.query(`INSERT INTO "students" ("first_name", "last_name", "email", "gender", "birth_date")
        VALUES ($1, $2, $3, $4, $5)`, [first_name, last_name, email, gender, birth_date], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        })
    }

    static editById(params, callback) {
        let query = `
            SELECT * FROM students
            WHERE id = ${params}
            `
        pool.query(query, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        })
    }

    static editPost(id, first_name, last_name, email, gender, birth_date, callback) {
        let error = this.validate(first_name, last_name, email, gender, birth_date)
        if (error) {
            callback(error, null)
        } else {
            pool.query(`UPDATE "students" SET "first_name" = $1, "last_name" = $2, "email" = $3, "gender" = $4, "birth_date" = $5
        WHERE "id" = $6`, [first_name, last_name, email, gender, birth_date, id], (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, true);
                }
            })
        }
    }

    static delete(params, callback) {
        let query = `
            DELETE FROM students
            WHERE id = ${params}
            `
        pool.query(query, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        })
    }

    static validate(first_name, last_name, email, gender, birth_date) {
        let error = []
        if (!first_name) {
            error.push('First Name Required');
        }
        if (!last_name) {
            error.push('last Name Required');
        }
        if (!email) {
            error.push('Email Required');
        }
        if (!gender) {
            error.push('Gender Required');
        }
        if (!birth_date) {
            error.push('Birth Required');
        }
        if (error.length > 0) {
            return error;
        }
        error = null
        return error;
    }

}

module.exports = StudentModel;