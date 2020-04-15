// const fs = require('fs')
const pool = require('../config/connection')
class SubjectModel {
    constructor(id, subject_name){
        this.id = id
        this.subject_name = subject_name
    }
    
    static getSubjects(callback){
        pool.query(`SELECT * FROM subjects ORDER BY id ASC`, (err, data) => {
            if(err){
                callback(err, null)
            }
            else{
                let result = []
                for (let i = 0; i < data.rows.length; i++) {
                    result.push(new SubjectModel(data.rows[i].id, data.rows[i].subject_name))
                }
                callback(null, result)
            }
        })
    }

    static getId(id, callback){
        pool.query(`SELECT * FROM subjects WHERE id = ${id}`, (err, data) => {
            if(err){
                callback(err, null)
            }
            else{
                let result = []
                for (let i = 0; i < data.rows.length; i++) {
                    result.push(new SubjectModel(data.rows[i].id, data.rows[i].subject_name))
                }
                callback(null, result)
            }
        })
    }
}

module.exports = SubjectModel