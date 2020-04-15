const db=require('../db/config')

class ModelTeacher{
    static getData(callback){
        db.query(`SELECT * FROM teachers`,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                // console.log(data.rows)
                callback(null,data.rows)
            }
        })
    }
    static filterGet(id,callback){
        const query=`SELECT * FROM teachers WHERE id = $1`
        const params=[id]

        db.query(query,params,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,data.rows)
            }
        })
    }

    static search(email,callback){
        const query=`SELECT * FROM teachers WHERE email = $1`
        const params=[email]
        db.query(query,params,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,data.rows)
            }
        })
    }
}

module.exports=ModelTeacher