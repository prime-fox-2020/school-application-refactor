const pool = require('../config/connection')

class ModelStudents{
    static getStudents(callback){
        pool.query(`SELECT * FROM students ORDER BY id ASC`, (err, res) => {
            if(err){
                callback(err, null)
            }
            else{
                callback(null, res.rows)
            }
        })
    }

    static write(data, callback){
        let error = this.valid(data) //
        if(error.length > 0){
            callback(error, null)
        }else{
            const query = `INSERT INTO students (first_name, last_name, email, gender, birth_date)
            VALUES ($1, $2, $3, $4, $5)`
    
            const params = [ data.first_name, data.last_name, data.email, data.gender, data.birth_date ] 
    
            pool.query(query, params, (err) => {
                if(err) callback(err)
                else{
                    callback(null, `New student has been added !`)
                }
            })
        }
    }
  

    static delete(id, callback){
        const query = `DELETE FROM students WHERE id = ${id}`
        pool.query(query, (err) => {
            if(err) callback(err)
            else callback(null, `Student with id ${id} has been deleted !`)
        })
    }

    static readWithId(id, callback){
        pool.query(`SELECT * FROM students WHERE id = ${id}`, (err, res) => {
            if(err){
                callback(err, null)
            }
            else{
                callback(null, res.rows)
            }
        })
    }

    static update(data, callback){
        let error = this.valid(data) //
        if(error.length > 0){
            callback(error, null)
        } else {
            const query = `UPDATE students SET first_name = $1, last_name = $2, email = $3, gender = $4 birth_date = $5 WHERE id = $6`
            const params = [ data.first_name, data.last_name, data.email, data.gender, data.birth_date, data.id ] 
            pool.query(query, params, (err) => {
                if(err) callback(err)
                else callback(null, `Student with id ${data.id} has been edited !`)
            })
        }
    }
    static valid(data){
        const error = [] //
        if(!data.first_name || !data.gender){
            error.push('please do not leave an empty data or unselected options')
        }
        if(!data.email || !data.email.includes('@')){
            error.push('please input email with the correct address')
        }
        if(!data.birth_date){
            error.push('birth date must be filled')
        }
        else{
            const num = data.birth_date.split('-')
            if(num.length !== 3){
                error.push('please use date format of DD-MM-YYYY')
            }
            else if(!(0 < Number(num[0]) && Number(num[0]) <= 31) ){
                error.push('please input the correct number of date')
            }
            else if(!(Number(num[1]) > 0 && Number(num[1]) <= 12) ){
                error.push('please input the correct number of month')
            }
            else if(Number(num[2]) < 1945 ){
                error.push('we do not think our school is appropriate for elders')
            }
        }
        return error
    }
    

    static getPageEmail(email, callback){
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

module.exports = ModelStudents