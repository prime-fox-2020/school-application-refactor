const pool = require('../config/connection.js')

class SubjectsModel {
    static showSubjects(callback) {
        const querySubjects = `SELECT * FROM subjects ORDER BY id asc`
        pool.query(querySubjects, (err, data) => {
            if (err) {
                callback(err, null)   
            } else { 
                callback(null, data.rows)
            }
        })
    }

    static postAdd(queryBody, callback) {
        const querySubjects = `
        INSERT INTO subjects (subject_name) 
        VALUES ($1)`
        const params = [queryBody.subject_name]
        pool.query(querySubjects, params, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
    }

    static getEditForm(paramsId, callback) {
        const querySubjects = `
        SELECT * FROM subjects WHERE id = $1`
        const params = [paramsId]
        pool.query(querySubjects, params, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data.rows[0])
            }
        })
    }

    static postEdit(queryBody, paramsId, callback) {
        const querySubjects = `
        UPDATE subjects 
        SET subject_name = '${queryBody.subject_name}'
        WHERE id = ${Number(paramsId)}`
        pool.query(querySubjects, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
    }

    static deleteSubject(paramsId, callback) {
        const querySubjects = `
        DELETE FROM subjects WHERE id = $1
        `
        const params = [paramsId]
        pool.query(querySubjects, params, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
    }
}



module.exports = SubjectsModel