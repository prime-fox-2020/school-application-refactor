// const fs = require('fs')
const pool = require('../connection')

class SubjectModel {

    static read (callback) {
        pool.query(`SELECT * FROM subject`, (err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, res.rows)
            }
        })
    }

    static readId (id, callback) {
        pool.query(`SELECT * FROM subject WHERE id = ${id}`, (err, res) => {
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