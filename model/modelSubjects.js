const pool = require('../config/connection.js')

class ModelSubjects {
    static getSubjects(callback) {
        const queryGetSubjects = `
            SELECT *
                FROM subjects
                ORDER BY id asc`

        pool.query(queryGetSubjects, (err, res) => {
            if (err) callback(err, null)

            else callback(null, res.rows)
        })
    }

    static getId(id, callback) {
        const queryId = `
            SELECT *
                FROM subjects
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

module.exports =ModelSubjects