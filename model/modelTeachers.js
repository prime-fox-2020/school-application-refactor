const pool = require('../config/connection.js')

class ModelTeachers {
    static getAll(callback) {
        const queryGetTeachers = `
            SELECT *
                FROM teachers
                ORDER BY id asc`

        pool.query(queryGetTeachers, (err, res) => {
            if (err) callback(err, null)

            else callback(null, res.rows)
        })
    }

    static getId(id, callback) {
        const queryId = `
            SELECT *
                FROM teachers
                WHERE id = '${id}'`

        pool.query(queryId, (err, res) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, res.rows)
            }
        })
    } 
}

module.exports =ModelTeachers