const pool = require('../connection')

class model{
    static readSubject(callback){
        pool.query(`SELECT * FROM subjects
        ORDER BY id ASC
        `,(err, data)=>{
            if(err) console.log(err)

            console.table(data.rows)
            callback(null, data.rows)
        })
    }

    static readSubjectId(id, callback){
        pool.query(`SELECT * FROM subjects
        WHERE id = ${id}
        `,(err, data)=>{
            if(err) console.log(err)

            console.table(data.rows)
            callback(null, data.rows)
        })
    }
}


module.exports = model