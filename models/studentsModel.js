const pool = require('../config/connection')

class StudentModel {
    constructor(id, firstName, lastName, email, gender, birthDate) {
        this.id = id
        this.first_name = firstName
        this.last_name = lastName
        this.email = email
        this.gender = gender
        this.birth_date = birthDate
    }

    static getStudents(callback) {
        pool.query(`SELECT * FROM students ORDER BY id ASC`, (err, data) => {
            if(err){
                callback(err, null)
            }
            else{
                let result = []
                let date;
                for (let i = 0; i < data.rows.length; i++) {
                    date = data.rows[i].birth_date.toLocaleDateString().split('/')
                    let newDate = date[1] + '-' + date[0] + '-' + date[2]
                    result.push(new StudentModel(data.rows[i].id, data.rows[i].first_name, data.rows[i].last_name, data.rows[i].email, data.rows[i].gender, newDate))
                }
                callback(null, result)
            }
        })
    }

    static validation(data) {
        let error = []
        if (!data.firstName) {
            error.push('Fill in your first name!')
        }
        if (!data.lastName) {
            error.push('Fill in your last name!')
        }
        if (!data.email) {
            error.push('Fill in your email adress!')
        }else{
            if(!data.email.includes('@')){
                error.push('Invalid email!')
            }
        }
        if (!data.gender) {
            error.push('Choose your gender!')
        }
        if (!data.birthDate) {
            error.push('Fill in your date of birth!')
        } else {
            let date = data.birthDate.split('-')
            if (date.length !== 3) {
                error.push('Follow the date format! -> MM-DD-YYYY')
            } else if (Number(date[1] == NaN)) {
                error.push('Please write the Month in Number!')
            } else if (date[0] < 1 || date[0] > 31) {
                error.push('Invalid Date!')
            } else if (date[1] < 1 || date[0] > 12) {
                error.push('Invalid Month!')
            }
        }
        return error
    }

    static add(data, callback) {
        let error = this.validation(data)
        if (error.length > 0){
            callback(error, null)
        } else {
            const query = `INSERT INTO students (first_name, last_name, email, gender, birth_date)
                VALUES ($1, $2, $3, $4, $5)`
    
            const params = [ data.firstName, data.lastName, data.email, data.gender, data.birthDate ] 
    
            pool.query(query, params, (err) => {
                if(err) {
                    callback(err)
                }
                else{
                    callback(null, `New student has been added.`)
                }
            })
        }
    }

    static delete(id, callback) {
        const query = `DELETE FROM students WHERE id = ${id}`
        pool.query(query, (err) => {
            if(err) {
                callback(err)
            }
            else {
                callback(null, `Student with id ${id} has been deleted.`)
            }
        })
    }

    static getEdit(id, callback){
        const query = `SELECT * FROM students WHERE id = $1`

        const params = [id]

        pool.query(query, params, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data.rows)
            }
        })
    }

    static update(id, data, callback) {
        let error = this.validation(data)
        if (error.length > 0){
            callback(error, null)
        } else{
            const query = `UPDATE students SET first_name = $1, last_name = $2, email = $3, birth_date = $4 WHERE id = ${id}`
    
            const params = [data.firstName, data.lastName, data.email, data.birthDate]
            pool.query(query, params, (err) => {
                if (err) {
                    callback(err, null)
                } else {
                    callback(null, `Student with id ${id} has been edited !`)
                }
            })
        }
    }

    static getEmail(email, callback){
        pool.query(`SELECT * FROM students WHERE email = '${email}'`, (err, data) => {
            if(err){
                callback(err, null)
            }
            else{
                let result = []
                let date;
                for (let i = 0; i < data.rows.length; i++) {
                    date = data.rows[i].birth_date.toLocaleDateString().split('/')
                    let newDate = date[1] + '-' + date[0] + '-' + date[2]
                    result.push(new StudentModel(data.rows[i].id, data.rows[i].first_name, data.rows[i].last_name, data.rows[i].email, data.rows[i].gender, newDate))
                }
                callback(null, result)
            }
        })
    }
}

module.exports = StudentModel