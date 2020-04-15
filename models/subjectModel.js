const fs = require('fs')
const pool = require('../config/configure')

class SubjectModel{
    
    static getSubjectList(callback){
        
        const query = `SELECT * FROM subject`
        pool.query(query, (err,result)=> {
            if(err){
                callback(err,null)
            } else {
                callback(null, result.rows)
            }
        })
    }

    static getSubjectIdList(subjectId, callback){
       
        const query = `SELECT * FROM subject WHERE id = $1`
        const param = [subjectId]
        pool.query(query, param,(err,result)=> {
            if(err){
                callback(err,null)
            } else {
                callback(null, result.rows)
            }
        })
    }
}

module.exports = SubjectModel