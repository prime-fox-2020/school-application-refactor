const pool = require('../config/connection')

class StudentsModel {

  static validation(student) {
    let error = []

    if(!student.first_name) {
      error.push('First Name cannot be empty')
    }

    if(!student.last_name) {
      error.push('Last Name cannot be empty')
    }

    if(!student.email) {
      error.push('Email cannot be empty')
    } else {
      if(!student.email.includes('@')) {
        error.push('Wrong Email format')
      } else if(!student.email.includes('.')) {
        error.push('Wrong Email format')
      }
    }

    if(!student.gender) {
      error.push('Gender must be selected')
    }

    if(!student.birth_date) {
      error.push('Birth date cannot be empty')
    } else {
      const formatDate = student.birth_date.split('-')
      let date = new Date
      let year = date.getFullYear()  

      if(formatDate.length !== 3) {
        error.push('Date format should be YYYY-MM-DD')
      } else if(formatDate[1] < 1 || formatDate[1] > 12) {
        error.push('Invalid Month')
      } else if(Number(formatDate[0]) > year) {
        error.push('Invalid Year')
      } else if(formatDate[1] == 1 || formatDate[1] == 3 || formatDate[1] == 5 || formatDate[1] == 7 || formatDate[1] == 8 || formatDate[1] == 10 || formatDate[1] == 12) {
        if(formatDate[2] < 1 ||  formatDate[2] > 31 ) {
          error.push('Invalid Date')
        }
      } else if(formatDate[1] == 4 || formatDate[1] == 6 || formatDate[1] == 9 || formatDate[1] == 11) {
        if(formatDate[2] < 1 ||  formatDate[2] > 30 ) {
          error.push('Invalid Date')
        }
      }else if(formatDate[1] == 2) {
        if(formatDate[2] < 1 || formatDate[2] > 29) {
          error.push('Invalid Date')
        }
      }
    }
    return error
  
  }

  static getStudents(callback) {
    const query = `SELECT * FROM students ORDER BY id asc`
    pool.query(query, (err, res) => {
      if(err) {
        callback(err, null)
      } else {
        callback(null, res.rows)
      }
    })
  }

  static postAdd(student, callback) {
    const error = this.validation(student)

    if(error.length >= 4) {
      callback(null, `Please fill the form first&type=danger`)
    } else if(error.length > 0 ) {
      callback(null, `${error}&type=danger`)
    } else {
      let query = `INSERT INTO students(first_name, last_name, email, gender, birth_date) VALUES ($1, $2, $3, $4, $5) `
      const params = [student.first_name, student.last_name, student.email, student.gender, student.birth_date]
      pool.query(query, params, err => {
        if(err) {
          callback(err, null)
        } else {
          callback(null, `Successfully added students ${student.first_name}&type=success`)
        }
      })
    }
  }

  static getEdit(paramsId, callback) {
    let query =  `SELECT * FROM students WHERE id = $1`
    let params = [paramsId]
    pool.query(query, params, (err, res) => {
      if(err) {
        callback(err, null)
      } else {
        callback(null, res.rows[0])
      }
    })
  }

  static postEdit(student, callback) {
    const error = this.validation(student)
    if(error.length > 0) {
      callback(null, `${error}&type=danger`)
    } else {
      let query = `UPDATE students SET first_name = $2, last_name = $3, email = $4, gender = $5, birth_date = $6 WHERE id = $1`
      let params = [student.id, student.first_name, student.last_name, student.email, student.gender, student.birth_date]
  
      pool.query(query, params, err => {
        if(err) {
          callback(err, null)
        } else {
          callback(null, `Successfully edited student ${student.first_name}&type=success`)
        }
      })
    }
  }

  static getEmail(email, callback) {
    let query = `SELECT * FROM students WHERE email = $1`
    let params = [email]

    pool.query(query, params, (err, res) => {
      if(err) {
        callback(err,null)
      } else {
        callback(null, res.rows)
      }
    })
  }

  static delete(studentId, callback) {
    let query = `DELETE FROM students WHERE id = $1`
    let params = [studentId]

    pool.query(query, params, err => {
      if(err) {
        callback(err,null)
      } else {
        callback(null, `Students id ${studentId} has been deleted`)
      }
    })
  }
  
}

module.exports = StudentsModel