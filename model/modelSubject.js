const db=require('../db/config')

class ModelSubject{
    static getData(callback){
        db.query(`SELECT * FROM subjects`,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,data.rows)
            }
        })
    }
    static filterGet(id,callback){
        const query=`SELECT * FROM subjects WHERE id = $1`
        const params=[id]

        db.query(query,params,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,data.rows)
            }
        })
    }

    static search(id,callback){
        const query=`SELECT * FROM subjects WHERE id = $1`
        const params=[id]
        db.query(query,params,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,data.rows)
            }
        })
    }
}

module.exports=ModelSubject