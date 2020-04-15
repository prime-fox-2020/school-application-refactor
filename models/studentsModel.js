const pool = require('../config/connection')
const fs = require('fs')

class StudentsModel{
    static getStudents(callback) {
        const querySelect = `SELECT * FROM students ORDER BY id asc `
        pool.query(querySelect, (err, data) => {
            if(err){
                callback(err, null)
            } else {
                callback(null, data.rows)
            }
        }) 
    }

    static addStudentsPost(dataStudents, callback) {
        let error = this.validasi(dataStudents)

        if(error.length > 0) {
            callback(error)
        } else {
            const queryAdd = `INSERT INTO students (first_name, last_name, email, gender, birth_date) 
            VALUES ($1, $2, $3, $4, $5)`
            
            const values = [dataStudents.first_name, dataStudents.last_name, dataStudents.email, dataStudents.gender, dataStudents.birth_date]
            pool.query(queryAdd, values, (err) => {
                if(err) {
                    callback(err)
                } else {
                    callback(null, 'yeay berhasil')
                }
            })
        }   
    }

    static validasi(data) {
        let error = []

        if(!data.first_name) {
            error.push('first name is required')
        }

        if(!data.last_name) {
            error.push('last name is required')
        }

        if(!data.email) {
            error.push('email is required')
        } else if(!data.email.includes('@') || !data.email.includes('.')){
            error.push('wrong format')
        }

        if(!data.gender) {
            error.push('gender is required')
        }

        if(!data.birth_date) {
            error.push('birth day is required')
        } else {
            let splitDate = data.birth_date.split('-')

            for(let i=0; i<splitDate.length; i++){

                let yy = Number(splitDate[0])
                let mm = Number(splitDate[1])
                let dd = Number(splitDate[2])

                if(yy !== 2020) {
                    error.push('YYYY should be 2020')
                } 

                if(mm < 1 || mm > 12) {
                    error.push('MM is only 1-12')
                }

                if(dd <1 ||  dd > 32) {
                    error.push('DD is only 1-31')
                }
            }
        }

        return error
    }

    static editStudentsGet(id, callback) {
        const queryUpdateGet = `SELECT * FROM students where id = $1`
        const values = [id]

        pool.query(queryUpdateGet, values, (err, data) => {
            if(err){
                callback(err)
            } else {
                callback(null, data.rows[0])
            }
        })
    }

    static editStudentsPost(newStudents, callback) {
        const queryUpdate = `UPDATE students SET
                                first_name = $1,
                                last_name = $2,
                                email = $3,
                                gender = $4,
                                birth_date = $5 WHERE id = $6`
        const values = [
            newStudents.first_name, 
            newStudents.last_name, 
            newStudents.email, 
            newStudents.gender, 
            newStudents.birth_date,
            newStudents.id]
 
        pool.query(queryUpdate, values, err => {
            if(err) {
                callback(err)
            } else {
                callback(null, 'berhasil diubah')
            }
        })
    }

    static deleteStudents(idParams, callback) {
        const queryDelete = `DELETE FROM students where id = ${idParams}`
        pool.query(queryDelete, (err) => {
            if(err){
                callback(err)
            } else {
                callback(null, 'id berhasil dihapus')
            }
        })
    }

    static read(callback) {
        fs.readFile('./data/students.json', 'utf8', (err, data) => {
            if(err){
                callback(err)
            } else {
                callback(null, JSON.parse(data))
            }
        })
    }

    static save(data, callback){
        fs.writeFile('./data/students.json', JSON.stringify(data, null, 3), (err) => {
            if(err){
                callback(err)
            } else {
                callback(null)
            }
        } )
    }

    static emailStudents(email, callback) {
        const queryEmail = `SELECT * FROM students where email = '${email}'`
        pool.query(queryEmail, (err, res) => {
            if(err) {
                callback(err)
            } else {
                callback(null, res.rows)
            }
        })
    }
}

module.exports = StudentsModel