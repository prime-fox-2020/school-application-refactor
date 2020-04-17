// const fs = require('fs')
const pool = require('../config/connection')

class StudentsModel {

  static showStudents(callback) {
    const query = `SELECT * FROM students ORDER BY students.id asc`

    pool.query(query, (err, results) => {
      if (err) {callback(err, null)}
      else {callback(null, results.rows)}
    })
  }

  static add(req, callback) {
    const query = `INSERT INTO students (first_name, last_name, email, gender) VALUES ($1, $2, $3, $4)`
    const params = [req.body.first_name, req.body.last_name, req.body.email, req.body.gender]

    pool.query(query, params, (err) => {
      if (err) {callback(err, null)}
      else {callback(null)}
    })
  }

  static getEdit (id, callback) {
    const query = `SELECT * FROM students WHERE students.id = $1`
    const params = [Number(id)]

    pool.query(query, params, (err, results) => {
      if (err) {callback(err, null)}
      else {callback(null, results.rows[0])}
    })
  }

  static edit (req, callback) {
    const ids = Number(req.params.id)
    const query = `UPDATE students SET first_name = $2, last_name = $3, email = $4, gender = $5 WHERE id = $1`
    const params = [ids, req.body.first_name, req.body.last_name, req.body.email, req.body.gender]

    pool.query(query, params, (err) => {
      if (err) {callback(err, null)}
      else {callback(null)}
    })
  }

  static delete (req, callback) {
    const query = `DELETE FROM students WHERE id = $1`
    const params = [Number(req.params.id)]

    pool.query(query, params, (err) => {
      if (err) {callback(err, null)}
      else {callback(null)}
    })
  }
}

module.exports = StudentsModel