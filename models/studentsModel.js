// const fs = require(`fs`)
const pool = require(`../db/connection`)


class StudentModel{

    constructor(id,first_name,last_name,email,gender,birt_date){
        this.id=id,
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.gender = gender,
        this.birt_date = birt_date
    }

    static getStudents(callback){
        let query = `
        SELECT * FROM students ORDER BY id`

        pool.query(query,(err,data)=>{
            if(err) callback(err,null)
            else { 
                let intance = []
                for (let i = 0; i < data.rows.length; i++) {

                    intance.push( new StudentModel (data.rows[i].id,data.rows[i].first_name,data.rows[i].last_name,data.rows[i].email,data.rows[i].gender,data.rows[i].birt_date))
                }
                callback(null,intance)
            }
        })
    }

    static validate(students){
        let dataSalah=[]
        if(!students.first_name){
            dataSalah.push(`FirstName Wajib di isi`)
        }
        if(!students.last_name){
            dataSalah.push(`LastName Wajib di isi`)
        }
        if(!students.email){
            dataSalah.push(`Email Wajib di isi`)
        }
        if(!students.gender){
            dataSalah.push(`Gender Wajib di isi`)
        }
        if(!students.birt_date){
            dataSalah.push(`birt date Wajib di isi`)
        }

        return dataSalah

    }

    static addPost(students,callback){

        let dataSalah = this.validate(students)

        if(dataSalah.length >0 ){
            callback(dataSalah,null)
        }else{
            let query =` INSERT INTO "students" ("first_name", "last_name", "email", "gender", "birt_date") VALUES ($1, $2, $3, $4, $5)`;

            let params =[students.first_name,students.last_name,students.email,students.gender,students.birt_date]

             pool.query(query,params,err=>{
                if(err) callback(err,null)
                else callback(null,`Student Baru Berhasil di tambahkan !`)
             })

        }

        

    }

    static delete(studentId,callback){
      

        let query ='DELETE FROM students WHERE id = $1'
        let params = [studentId]
        pool.query(query,params,(err,data)=>{
            if(err) callback(err,null)
            else callback(null,` Student dengan Id : ${studentId}, berhasil di delete`)
        })
    }

    static editGet(studentId,callback){
        
        let query = ` SELECT * FROM students WHERE id = $1`

        let params =[studentId]

        pool.query(query,params, (err,data) =>{
            if(err) callback(err,null)
            else callback(null,data.rows[0])
        })

    }

    static editPost(editStudent,callback){


        let dataSalah = this.validate(editStudent)
    
        if(dataSalah.length >0 ){
            callback(dataSalah,null)
        }else{
            let query =` UPDATE students SET first_name = $1, last_name = $2, email = $3, gender = $4, birt_date = $5 WHERE id = $6`

            let params = [editStudent.first_name,editStudent.last_name,editStudent.email,editStudent.gender,editStudent.birt_date,editStudent.id]

            pool.query(query,params,(err,data)=>{
                if(err) callback(err,null)
                else callback(null,`Data Students dengan ID : ${editStudent.id} berhasil di edit`)
            })
        }
        
    }

}


module.exports = StudentModel