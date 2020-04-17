'use strict'
const pool = require('../config/connection')

class TeachersModel{
  static getTeachers(callback){
    const query = `
      SELECT * FROM teachers ORDER BY id
    `
    pool.query(query, (err, data) => {
      if(err) callback(err, null)
      else callback(null, data.rows)
    })
  }

  static getTeacherId(id,callback){
    const query = `
      SELECT * FROM teachers WHERE id = $1
    `
    const params = [id]
    pool.query(query, params, (err, data) => {
      if(err) callback(err, null)
      else callback(null, data.rows[0])
    })
  }
}

module.exports = TeachersModel