const pool = require('../config/connection')

class TeachersModel {
    constructor(id, firstName, lastName, email, gender){
        this.id = id
        this.first_name = firstName
        this.last_name = lastName
        this.email = email
        this.gender = gender
    }
    
    static getTeachers(callback){
        pool.query(`SELECT * FROM teachers ORDER BY id ASC`, (err, data) => {
            if(err){
                callback(err, null)
            }
            else{
                let result = []
                for (let i = 0; i < data.rows.length; i++) {
                    result.push(new TeachersModel(data.rows[i].id, data.rows[i].first_name, data.rows[i].last_name, data.rows[i].email, data.rows[i].gender))
                }
                callback(null, result)
            }
        })
    }

    static getId(id, callback){
        pool.query(`SELECT * FROM teachers WHERE id = ${id}`, (err, data) => {
            if(err){
                callback(err, null)
            }
            else{
                let result = []
                for (let i = 0; i < data.rows.length; i++) {
                    result.push(new TeachersModel(data.rows[i].id, data.rows[i].first_name, data.rows[i].last_name, data.rows[i].email, data.rows[i].gender))
                }
                callback(null, result)
            }
        })
    }
}

module.exports = TeachersModel