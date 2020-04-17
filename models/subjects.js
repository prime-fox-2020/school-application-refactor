'use strict'
const pool = require('../config/connection')

class SubjectsModel{
  static getSubjects(callback){
    const query = `
      SELECT * FROM subjects ORDER BY id
    `
    pool.query(query, (err, data) => {
      if(err) callback(err, null)
      else callback(null, data.rows)
    })
  }

  static getSubjectId(id,callback){
    const query = `
      SELECT * FROM subjects WHERE id = $1
    `
    const params = [id]
    pool.query(query, params, (err, data) => {
      if(err) callback(err, null)
      else callback(null, data.rows[0])
    })
  }
}

module.exports = SubjectsModel