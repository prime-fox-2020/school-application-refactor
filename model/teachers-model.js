const pool = require('../config/connection.js')

class TeachersModel {
    static showTeachers(callback) {
        const queryTeachers = `SELECT * FROM teachers ORDER BY id asc`
        pool.query(queryTeachers, (err, data) => {
            if (err) {
                callback(err, null)   
            } else { 
                callback(null, data.rows)
            }
        })
    }

    static postAdd(queryBody, callback) {
        const queryTeachers = `
        INSERT INTO teachers (first_name, last_name, email, gender) 
        VALUES ($1, $2, $3, $4)`
        const params = [queryBody.first_name, queryBody.last_name, queryBody.email, queryBody.gender]
        pool.query(queryTeachers, params, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
    }

    static getEditForm(paramsId, callback) {
        const queryTeachers = `
        SELECT * FROM teachers WHERE id = $1`
        const params = [paramsId]
        pool.query(queryTeachers, params, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data.rows[0])
            }
        })
    }

    static postEdit(queryBody, paramsId, callback) {
        const queryTeachers = `
        UPDATE teachers 
        SET first_name = '${queryBody.first_name}',
            last_name = '${queryBody.last_name}',
            email = '${queryBody.email}',
            gender = '${queryBody.gender}'
        WHERE id = ${Number(paramsId)}`
        pool.query(queryTeachers, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
    }

    static deleteTeachers(paramsId, callback) {
        const queryTeachers = `
        DELETE FROM teachers WHERE id = $1
        `
        const params = [paramsId]
        pool.query(queryTeachers, params, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
    }

    static searchTeacherByEmail(bodyEmail, callback) {
        const queryTeachers = `SELECT * FROM teachers 
        WHERE email = '${bodyEmail}'`
        pool.query(queryTeachers, (err, data) => {
            if (err) {
                callback(err, null)   
            } else {
                callback(null, data.rows)
            }
        })
    }
}



module.exports = TeachersModel