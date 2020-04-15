const fs = require('fs')
const pool = require('../config/configure')

class StudentModel{
    constructor(id, first_name, last_name, email,gender, birth_date){
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.gender = gender
        this.birth_date = birth_date
    }
    static getStudentList(callback){
        
        const query = `SELECT * FROM student ORDER BY id asc;`
        pool.query(query, (err,result)=> {
            if(err) {
                callback(err,null)
            } else{
                // console.log(result.rows)
                const instance = []
                let birth_date
                for (let i = 0 ;i<result.rows.length; i++){
                    birth_date = result.rows[i].birth_date.toLocaleDateString().split('/')
                    let birth = birth_date[1] + '-' + birth_date[0] + '-' + birth_date[2]
                    // console.log(birth)
                    instance.push(new StudentModel(result.rows[i].id, result.rows[i].first_name, result.rows[i].last_name, result.rows[i].email, result.rows[i].gender, birth))
                }
                // callback(null, result.rows)
                callback(null,instance)
            }
        })
    }

    static validation(data){
        let error = []
        if (!data.first_name){
            error.push(`First Name Kosong`)
        }
        if (!data.last_name){
            error.push(`Last Name Kosong`)
        }   
        if (!data.email){
            error.push(`Invalid Email Input`)
        } else {
            if (!data.email.includes('@')){
                error.push(`Invalid Email Input`)
            }
        }
        if (!data.gender){
            error.push(`Gender Kosong`)
        }
        if (!data.birth_date){
            error.push(`Birth Date Kosong`)
        } else {
            let birth = data.birth_date.split('-')
            let date = birth[0]
            let month = birth[1]
            if (birth.length !== 3){
                error.push(`Invalid date`)
            }else {
                if (month<1 || month>12){
                    error.push(`Invalid Month`)
                } else {
                    if (date< 1 || date > 32){
                        error.push(`Invalid Date`)
                    }
                } 
            }
        }
        return error
    }

    static addStudentPost(newStudent, callback){
        let error = this.validation(newStudent)
        if (error.length > 0){
            callback(error,null)
        } else {
            const query = `INSERT INTO student (first_name, last_name, email, gender, birth_date) VALUES ($1,$2,$3,$4,$5);`
            const param = [newStudent.first_name, newStudent.last_name, newStudent.email, newStudent.gender, newStudent.birth_date]
            pool.query(query, param, (err,result)=> {
                if(err){
                    callback(err,null)
                } else {
                    callback(null, `Student baru berhasil ditambah`)
                }
            })
        }
    }

    static editStudentGet(studentId, callback){
        
        const query = `SELECT * FROM student WHERE id = $1;`
        const param = [studentId]
        pool.query(query,param,(err,result)=>{
            if(err){
                callback(err,null)
            } else {
                // console.log(result.rows[0].birth_date)
                let birth_date = result.rows[0].birth_date.toLocaleDateString().split('/')
                let birth = birth_date[1] + '-' + birth_date[0] + '-' + birth_date[2]
                let instance = new StudentModel(result.rows[0].id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].email, result.rows[0].gender, birth)
                // callback(null,result.rows[0])
                callback(null,instance)
            }
        })
    }

    static editStudentPost(updatedStudent, callback){
        let error = this.validation(updatedStudent)
        if (error.length > 0){
            callback(error,null)
        } else {
            const query = `
            UPDATE student
            SET first_name = $2, last_name = $3, email = $4, gender = $5, birth_date = $6
            WHERE id = $1;`
            const param = [updatedStudent.id, updatedStudent.first_name, updatedStudent.last_name, updatedStudent.email, updatedStudent.gender, updatedStudent.birth_date]
            pool.query(query, param, (err,result)=> {
                if(err){
                    callback(err,null)
                } else {
                    callback(null, `Student with id ${updatedStudent.id} has been edited`)
                }
            })
        }
    }

    static deleteStudentGet(studentId, callback){
        
        const query = `DELETE FROM student WHERE id = $1;`
        const param = [studentId]
        pool.query(query,param,(err,result)=>{
            if(err){
                callback(err,null)
            } else {
                callback(null, `Student with id ${studentId} berhasil dihapus`)
            }
        })
    }

    static emailStudentGet(studentEmail, callback){
        
        if (studentEmail){

        } else {
            const query = `SELECT * FROM student WHERE email = $1;`
            const param = [studentEmail]
            pool.query(query,param, (err,result)=> {
                if(err){
                    callback(err,null)
                } else {
                    callback(null,result.rows[0])
                }
            })
        }
    }
}

module.exports = StudentModel