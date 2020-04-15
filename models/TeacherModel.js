const pool = require('../config/connection')

class TeacherModel{
    static get(callback) {
        let query = `
        SELECT * FROM "teachers"
        `
        pool.query(query, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        })
    }

    static getById(params, callback) {
        let query = `
        SELECT * FROM teachers
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
}

module.exports = TeacherModel;