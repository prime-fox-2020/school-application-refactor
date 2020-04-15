const pool = require('../sinyal')

class TeachersModel{
  static getbyId(params, callback){
  let query = `SELECT * FROM guru WHERE id = $1`

  let kotak = [Number(params)]
console.log(params)
  pool.query(query, kotak, (err,data)=>{
    if(err){
      callback(err,null)
    }else{
      
      callback(null, data.rows)
    }
  })
  }

  static showTeacher(callback){
    let query = `SELECT * FROM guru`

    pool.query(query,(err,data)=>{
      if(err){
        callback(err,null)
      }else{
        callback(null, data.rows)
      }
    })
  }
}


module.exports = TeachersModel