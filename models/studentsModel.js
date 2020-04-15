const pool = require('../config/connection')

class StudentsModel {

  static getStudents(callback){
    this.open((err, data)=>{
      if(err){
        callback(err, null)
      } else {
        callback(null, data)
      }
    })
  }

  static open(callback){
    const query = `SELECT * FROM students ORDER BY id asc`
    pool.query(query, (err, res)=>{
      if(err){
        callback(err, null)
      } else {
        callback(null, res.rows)
      }
    })
  }

  static addPost(data, callback){
    let error = []
    if(!data.first_name) error.push(`First Name is required`)
    if(!data.last_name) error.push(`Last Name is required`)
    if(!data.email) {
      error.push(`Email is required`)
    }else if(!data.email.includes('@')) {
      error.push(`Wrong format email`)
    }else if(!data.email.includes('.')) {
      error.push(`Wrong format email`)
    }

    let date = data.birth_date
    let temp = date.split('-')
    for (let i = 0; i < temp.length; i++) temp[i] = Number(temp[i])

    if (temp[0] < 1800||temp[0] > 2020) error.push(`Birth date format should be YYYY-MM-DD`)
    if (temp[1] < 1||temp[1] > 12) error.push(`Birth date format should be YYYY-MM-DD`)
    if (temp[2] < 1||temp[2] > 31) error.push(`Birth date format should be YYYY-MM-DD`)
    
    if(error.length > 0){
      callback(error,null)
    } else {
      switch(temp[1]){
        case 1: temp[1] = 'Januari'; break
        case 2: temp[1] = 'Februari'; break
        case 3: temp[1] = 'Maret'; break
        case 4: temp[1] = 'April'; break
        case 5: temp[1] = 'Mei'; break
        case 6: temp[1] = 'Juni'; break
        case 7: temp[1] = 'Juli'; break
        case 8: temp[1] = 'Agustus'; break
        case 9: temp[1] = 'September'; break
        case 10: temp[1] = 'Oktober'; break
        case 11: temp[1] = 'November'; break
        case 12: temp[1] = 'Desember'; break
        default: ;break
      }
      date = temp.reverse().join(' ')
      const query = `INSERT INTO students (first_name, last_name, email, gender, birth_date) VALUES ($1,$2, $3, $4, $5)`
      const params = [data.first_name, data.last_name, data.email, data.gender, date]
  
      pool.query(query, params, err =>{
        if (err){
          callback(err, null)
        } else {
          callback(null, `Students has been added!`)
        }
      })
    }
  }

  static editGet(paramsId, callback) {
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

  static editPost(student, callback) {
    let error = []
    if(!student.first_name) error.push(`First Name is required`)
    if(!student.last_name) error.push(`Last Name is required`)
    if(!student.email) {
      error.push(`Email is required`)
    }else if(!student.email.includes('@')) {
      error.push(`Wrong format email`)
    }else if(!student.email.includes('.')) {
      error.push(`Wrong format email`)
    }

    let date = student.birth_date
    let temp = date.split('-')
    for (let i = 0; i < temp.length; i++) temp[i] = Number(temp[i])

    if (temp[0] < 1800||temp[0] > 2020) error.push(`Birth date format should be YYYY-MM-DD`)
    if (temp[1] < 1||temp[1] > 12) error.push(`Birth date format should be YYYY-MM-DD`)
    if (temp[2] < 1||temp[2] > 31) error.push(`Birth date format should be YYYY-MM-DD`)
    
    if(error.length > 0){
      callback(error,null)
    } else {
      switch(temp[1]){
        case 1: temp[1] = 'Januari'; break
        case 2: temp[1] = 'Februari'; break
        case 3: temp[1] = 'Maret'; break
        case 4: temp[1] = 'April'; break
        case 5: temp[1] = 'Mei'; break
        case 6: temp[1] = 'Juni'; break
        case 7: temp[1] = 'Juli'; break
        case 8: temp[1] = 'Agustus'; break
        case 9: temp[1] = 'September'; break
        case 10: temp[1] = 'Oktober'; break
        case 11: temp[1] = 'November'; break
        case 12: temp[1] = 'Desember'; break
        default: ;break
      }
      date = temp.reverse().join(' ')
      let query = `UPDATE students SET first_name = $2, last_name = $3, email = $4, gender = $5, birth_date = $6 WHERE id = $1`
      let params = [student.id, student.first_name, student.last_name, student.email, student.gender, date]
      pool.query(query, params, err => {
        if(err) {
          callback(err, null)
        } else {
          callback(null, `Students with id: ${student.id} has been successfuly edited!`)
        }
      })
    }
  }

  static delete(studentsId, callback){
    const query = `DELETE FROM students WHERE id = $1`
    const params = [studentsId]

    pool.query(query, params, err=>{
      if (err){
        callback(err, null)
      } else {
        callback(null, `Students with id: ${studentsId} has been deleted!`)
      }
    })
  }

  static getEmail(email, callback){
    let query = `SELECT * FROM students WHERE email = $1`
    let params = [email]

    pool.query(query, params, (err,res)=>{
      if(err){
        callback(err, null)
      } else {
        callback(null, res.rows)
      }
    })
  }

}

module.exports = StudentsModel