const pool = require('../config/connection')

class TeacherModel{
    static get(callback){
        let query = `
            SELECT 
                *    
            FROM    
                teacher
        `
        pool.query(query, (err,res) => {
            if(err){
                callback(err, null)
            } else{
                callback(null, res)
            }
        })
    }
}

module.exports = TeacherModel