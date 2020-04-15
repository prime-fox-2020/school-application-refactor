const pg = require('../config/connection')

class ModelStudents{
    static getStudents(callback){
        pg.query(`SELECT * FROM students ORDER BY id ASC`, (err, res) => {
            if(err){
                callback(err, null)
            }
            else{
                callback(null, res.rows)
            }
        })
    }

    static readWithId(id, callback){
        pg.query(`SELECT * FROM students WHERE id = ${id}`, (err, res) => {
            if(err){
                this.call(err, null)
            }
            else{
                callback(null, res.rows)
            }
        })
    }

    static delete(id, callback){
        const query = `DELETE FROM students WHERE id = ${id}`
        pg.query(query, (err) => {
            if(err) callback(err)
            else callback(null, `Student with id ${id} has been deleted.`)
        })
    }

    static update(id, data, callback){
        const error = this.validate(data)
        
        if(error.length > 0){
            callback(error, null)
        } else {
            const query = `UPDATE students SET first_name = $1, last_name = $2, email = $3, gender = $4, birth_date = $5 WHERE id = $6`
            const params = [ data.first_name, data.last_name, data.email, data.gender, data.birth_date, id ] 
            pg.query(query, params, (err) => {
                if(err) callback(err)
                else callback(null, `Student with id ${id} has been edited.`)
            })
        }
        
    }

    static validate(data){
        const error = []
        if(!data.first_name){
            error.push('name must be filled')
        }
        if(!data.email){
            error.push('email must be filled')
        }
        else{
            if(!data.email.includes('@')){
                error.push('format email must be correct')
            }
            else if(!data.email.includes('@sekolah.id')){
                error.push('email used must be ended with @sekolah.id')
            }
        }
        if(!data.gender){
            error.push('gender must be selected')
        }
        if(!data.birth_date){
            error.push('birth date must be filled')
        }
        else{
            const arr = data.birth_date.split('-')
            if(arr.length !== 3){
                error.push('Format date must be DD-MM-YYYY')
            }
            else if(Number(arr[1]) < 1 || Number(arr[1]) > 12){
                error.push('Input for month should be valid')
            }
            else if(Number(arr[1]) === 1 || Number(arr[1]) === 3 || Number(arr[1]) === 5 || Number(arr[1]) === 7 || Number(arr[1]) === 8 || Number(arr[1]) === 10 || Number(arr[1]) === 12){
                if(Number(arr[0]) < 1 || Number(arr[0]) > 31){
                    error.push('Input for date should be valid')
                }
            }
            else if(Number(arr[1]) === 4 || Number(arr[1]) === 6 || Number(arr[1]) === 9 || Number(arr[1]) === 11){
                if(Number(arr[0]) < 1 || Number(arr[0]) > 30){
                    error.push('Input for date should be valid')
                }
            }
            else if(Number(arr[1]) === 2){
                if(Number(arr[0]) < 1 || Number(arr[0]) > 29){
                    error.push('Input for date should be valid')
                }
            }
        }
        return error
    }

    static write(data, callback){
        const error = this.validate(data)
        
        if(error.length > 0){
            callback(error, null)
        } else {
            const query = `INSERT INTO students (first_name, last_name, email, gender, birth_date)
            VALUES ($1, $2, $3, $4, $5)`

            const params = [ data.first_name, data.last_name, data.email, data.gender, data.birth_date ] 

            pg.query(query, params, (err) => {
                if(err) callback(err)
                else{
                    callback(null, `New student has been added.`)
                }
            })
        }
    }

    static getPageEmail(email, callback){
        pg.query(`SELECT * FROM students WHERE email = '${email}'`, (err, res) => {
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
