const fs = require("fs")
const pool = require("../connection/config")

class teachersModels {
    static showTeachers(callback) {

        const query = `
            SELECT * FROM teachers
            ORDER BY id ASC
        `

        pool.query(query, (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results.rows)
            }
        })
    }

    static findTeacherById(id, callback) {

        const query = `
            SELECT * FROM teachers
            WHERE id = $1
        `
        // console.log(id)
        let params = [id]
        pool.query(query, params,(err, results) => {
            if (err) {
                callback(err, null)
            } else {
                // console.log(results)
                callback(null, results.rows)
            }
        })
    }
}

module.exports = teachersModels