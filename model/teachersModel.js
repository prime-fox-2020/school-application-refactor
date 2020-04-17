const pool = require('../config/connection')

class TeachersModel {

  static getTeachers(callback) {
    const query = `SELECT * FROM teachers`
    pool.query(query, (err, res) => {
      if(err) {
        callback(err, null)
      } else {
        callback(null, res.rows)
      }
    })
  }

  static getId(params, callback) {
    let query = `SELECT * FROM teachers WHERE id = $1`
    let paramsId = [params]

    pool.query(query, paramsId, (err, res) => {
      if(err) {
        callback(err, null)
      } else {
        callback(null, res.rows)
      }
    })
  }
  
}

module.exports = TeachersModel