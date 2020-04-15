// const fs = require('fs')
const pool = require('../connection')

class SubjectModel {
    static getSubject(callback) {
        this.openFile((err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }

    static openFile (callback) {
        pool.query(`SELECT * FROM subject`, (err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, res.rows)
            }
        })
    }
}

module.exports = SubjectModel;