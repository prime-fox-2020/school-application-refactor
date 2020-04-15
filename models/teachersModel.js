const pool = require('../config/connection')

class TeachersModel {

  static getTeachers(callback){
    this.open((err, data)=>{
      if (err) callback (err, null)
      else callback (null, data)
    })
  }

  static open(callback){
    const query = `SELECT * FROM teachers ORDER BY id asc`
    pool.query(query, (err, res)=>{
      if(err){
        callback(err, null)
      } else {
        callback(null, res.rows)
      }
    })
  }

  static getId(id, callback){
    let query = `SELECT * FROM teachers WHERE id = $1`
    let params = [id]

    pool.query(query, params, (err,res)=>{
      if(err){
        callback(err, null)
      } else {
        callback(null, res.rows)
      }
    })
  }
}

module.exports = TeachersModel