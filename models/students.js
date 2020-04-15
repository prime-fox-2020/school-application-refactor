const pool = require('../config/connection')

class StudentsModel {

    static getAll(callback) {
        pool.query(`SELECT * FROM students ORDER BY id ASC`, (err, res) => {
            if(err){
                callback(err, null)
            }
            else{
                callback(null, res.rows)
            }
        })
    }

    static validation(data) {
        let error = []
        
        if(!data.first_name || !data.last_name || !data.gender || !data.email || ! data.birth_date){
            error.push('Please fill all fields')
        }

        if(data.email.includes('@') || data.email.includes('.')){
            error.push('Please input the correct email address')
        }

        const birth_date = data.birth_date.split('-')
        if(birth_date.length !== 3){
            error.push('Please input birth date with dd-mm-yyyy format')
        } else {
            let dd = birth_date[0]
            let mm = birth_date[1]
            let yyyy = birth_date[2]

            if(dd.length !== 2 || mm.length !== 2 || yyyy.length !== 2){
                error.push('Please input birth date with dd-mm-yyyy format')
            } else {
                dd = Number(dd)
                mm = Number(mm)
                yyyy = Number(yyyy)

                if(dd < 1 || dd > 31){
                    error.push('Please input dd between 1 & 31')
                }

                if(dd < 1 || dd > 12){
                    error.push('Please input mm between 1 & 12')
                }

                if(yyyy < 2000 || yyyy > 2005){
                    error.push('Please input rational number for a junior high school student age')
                }
            }
        }    
        return error
    }

    static addProcess(data, callback) {
        let errorMessage = this.validation(data)
        if (errorMessage.length > 1) {
            callback(errorMessage, null)
        } else {
            const query = `INSERT INTO students (first_name, last_name, email, gender, birth_date) VALUES ($1, $2, $3, $4, $5)`
            const params = [data.first_name, data.last_name, data.email, data.gender, data.birth_date] 

            pool.query(query, params, (err, res) => {
                if(err) {
                    callback(err)
                }
                else{
                    callback(null, `New student has been added. Name: ${data.first_name} ${data.last_name}`)
                }
            })
        }
        
    }

    static deleteProcess(id, callback) {
        const query = `DELETE FROM students WHERE id = ${id}`
        pool.query(query, (err, res) => {
            if(err) {
                callback(err)
            }
            else {
                callback(null, `Student with ID = ${id} has been deleted`)
            }
        })
    }

    static getOne(id, callback){
        const query = `SELECT * FROM students WHERE id = $1`
        const params = [id]

        pool.query(query, params, (err, res) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, res.rows)
            }
        })
    }

    static editProcess(id, data, callback) {
        let errorMessage = this.validation(data)
        if(errorMessage.length > 1){
            callback(errorMessage, null)
        } else {
            const query = `UPDATE students SET first_name = $1, last_name = $2, email = $3, gender = $4, birth_date = $5 WHERE id = ${id}`
            const params = [data.first_name, data.last_name, data.email, data.gender, data.birth_date] 
    
            pool.query(query, params, (err, res) => {
                if (err) {
                    callback(err, null)
                } else {
                    callback(null, `Student with ID = ${id} has been edited`)
                }
            })
        }
    }

    static getByEmail(email, callback){
        pool.query(`SELECT * FROM students WHERE email = '${email}'`, (err, res) => {
            if(err){
                callback(err, null)
            }
            else{
                callback(null, res.rows)
            }
        })
    }

}

module.exports = StudentsModel