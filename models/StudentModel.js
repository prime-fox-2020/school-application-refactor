const pool = require('../config/connection')

class StudentModel {
  
  static findAll(callback) {
    const query = 'SELECT * FROM students ORDER BY id'
    pool.query(query, (err, results) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, results.rows)
      }
    })
  }

  static findByEmail(email, callback) {
    const query = 'SELECT * FROM students WHERE email = $1 ORDER BY id'
    const params = [email]
    pool.query(query, params, (err, results) => {
      if (err) {
        callback(err, null)
      } else if (results.rows.length) {
        callback(null, results.rows[0])
      } else {
        callback(null, `Student with email ${email} is not found.`)
      }
    })
  }

  static createOne({first_name, last_name, gender, email}, callback) {
    if (first_name && last_name && gender && email) {
      const query = 'INSERT INTO students (first_name, last_name, gender, email) VALUES ($1, $2, $3, $4)'
      const params = [first_name, last_name, gender, email]
      pool.query(query, params, err => {
        if (err) {
          callback(err, null)
        } else {
          callback(null, 'success')
        }
      })
    } else {
      callback(null, 'All fields should not be empty.')
    }
  }

  static getEdit(id, callback) {
    const query = `SELECT * FROM students WHERE id = $1`
    const params = [id]
    pool.query(query, params, (err, results) => {
      if (err) {
        callback(err, null)
      } else if (results.rows.length) {
        callback(null, results.rows[0])
      } else {
        callback(null, `Student with ID ${id} is not found.`)
      }
    })
  }

  static postEdit(id, { first_name, last_name, gender, email }, callback) {
    const query = `UPDATE students SET first_name = $2, last_name = $3, gender = $4, email = $5  WHERE id = $1`
    const params = [id, first_name, last_name, gender, email]
    if (first_name && last_name && gender && email) {
      pool.query(query, params, err => {
        if (err) {
          callback(err, null)
        } else {
          callback(null, `success`)
        }
      })
    } else {
      callback(null, 'All fields should not be empty.')
    }
  }

  static deleteById(id, callback) {
    const query = `DELETE FROM students WHERE id = $1`
    const params = [id]

    pool.query(query, params, err=> {
      if (err) {
        callback(err, null)
      } else {
        callback(null, 'success')
      }
    })
  }
}

module.exports = StudentModel