const pool = require('../config/connection')

class StudentModel {
  constructor({id = null, first_name, last_name, email, gender, birth_date}) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.gender = gender
    this.birth_date = birth_date
  }

  dbToIndonesian() {
    const dictionary = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'
                      , 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const date = this.birth_date
    let result = ''
    date.getDate() < 10 ? result += `0${date.getDate()}` : result += date.getDate()
    result += ` ${dictionary[date.getMonth()]} `
    result += date.getFullYear()
    return result
  }

  getBod() {
    const date = this.birth_date
    let result = ''
    date.getDate() < 10 ? result += `0${date.getDate()}` : result += date.getDate()
    date.getMonth() < 9 ? result += `-0${date.getMonth() + 1}-` : result += `-${date.getMonth() + 1}-`
    result += date.getFullYear()
    return result
  }

  static bodValidation([date, month, year]) {
    let result = ''
    if (typeof date === 'number' && typeof month === 'number' && typeof year === 'number') {
      if (date < 1 || date > 31 || month < 1 || month > 12 || year < 1900 || new Date(year, 11, 31) > Date.now()) return false
        switch (month) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            result += year
            month < 10 ? result += `-0${month}-` : result += `-${month}-`
            date < 10 ? result += `0${date}` : result += `${date}`
            return result
          case 2:
            if (year % 4 !== 0 && date > 28) return false
            if (date > 29) return false
            result += year
            month < 10 ? result += `-0${month}-` : result += `-${month}-`
            date < 10 ? result += `0${date}` : result += `${date}`
            return result
          case 4:
          case 6:
          case 9:
          case 11:
            if (date > 30) return false
            result += year
            month < 10 ? result += `-0${month}-` : result += `-${month}-`
            date < 10 ? result += `0${date}` : result += `${date}`
            return result
        }
    }
    return false
  }
  
  static findAll(callback) {
    const query = 'SELECT * FROM students ORDER BY id'
    pool.query(query, (err, results) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, results.rows.map(el => new StudentModel(el)))
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

  static createOne({first_name, last_name = '', gender, birth_date, email}, callback) {
    const emailValid = email.includes('@sekolah.id')
    birth_date = this.bodValidation(birth_date.split('-').map(el => Number(el)))
    if (first_name && gender && email && birth_date && emailValid) {
      const query = 'INSERT INTO students (first_name, last_name, gender, email, birth_date) VALUES ($1, $2, $3, $4, $5)'
      const params = [first_name, last_name, gender, email, birth_date]
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
        callback(null, new StudentModel(results.rows[0]))
      } else {
        callback(null, `Student with ID ${id} is not found.`)
      }
    })
  }

  static postEdit(id, { first_name, last_name = '', gender, email, birth_date }, callback) {
    const query = `UPDATE students SET first_name = $2, last_name = $3, gender = $4, email = $5, birth_date =$6  WHERE id = $1`
    const params = [id, first_name, last_name, gender, email, birth_date]
    const emailValid = email.includes('@sekolah.id')
    birth_date = this.bodValidation(birth_date.split('-').map(el => Number(el)))
    if (first_name && gender && email && birth_date && emailValid) {
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
// let eko = {
//   first_name: 'eko',
//   last_name: 'p',
//   email: 'asdasd@assaf.com',
//   gender: 'male',
//   birth_date: '1988-06-01'
// }
// let test = new StudentModel(eko)
// console.log(test.dbToIndonesian())

module.exports = StudentModel