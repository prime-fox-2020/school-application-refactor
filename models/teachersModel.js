const fs = require('fs')
const pool = require('../connection')

class TeachersModel {
    static getTeachers(callback) {
        this.openFile((err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }

    static getTeachersId(req, callback) {
        pool.query(`SELECT * FROM teachers WHERE id = '${req}'`, (err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, res.rows)
            }
        })
    }


    static openFile (callback) {
        pool.query(`SELECT * FROM teachers`, (err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, res.rows)
            }
        })
    }
}

module.exports = TeachersModel;