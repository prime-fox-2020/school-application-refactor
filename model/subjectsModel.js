const pool = require('../sinyal')

class SubjectsModel{
  static getbyId(params, callback){
  let query = `SELECT * FROM subjects WHERE id = $1`

  let kotak = [Number(params)]

  pool.query(query, kotak, (err,data)=>{
    if(err){
      callback(err,null)
    }else{
      
      callback(null, data.rows)
    }
  })
  }

  static showSubject(callback){
    let query = `SELECT * FROM subjects`

    pool.query(query,(err,data)=>{
      if(err){
        callback(err,null)
      }else{
        callback(null, data.rows)
      }
    })
  }
}


module.exports = SubjectsModel