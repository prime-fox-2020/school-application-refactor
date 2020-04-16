const pool = require('../config/connection')

class SubjectModel{
    static get(callback){
        let query =`
            SELECT
                    *
            FROM 
                    subject
        `
        pool.query(query, (err, res) => {
            if(err){
                callback(err, null)
            } else{
                callback(null, res)
            }
        })
    }
}

module.exports = SubjectModel
