// const fs = require(`fs`)
const pool = require(`../db/connection`)


class StudentModel{

    constructor(){

    }

    static getStudents(callback){
        // baca file .json lempar ke controller
        // this.open((err,data)=>{
        //     if(err) callback(err,null)
        //     else callback(null,data)
        // })


        let query = `
        SELECT * FROM students ORDER BY id`

        pool.query(query,(err,data)=>{
            if(err) callback(err,null)
            else callback(null,data.rows)
        })
    }

    // static open(callback){
    //     fs.readFile(`./student.json`,`utf8`,(err,data)=>{
    //         if(err) callback(err,null)
    //         else 
    //         callback(null,JSON.parse(data))

    //     })
    // }

    static addPost(students,callback){
        // this.open((err,data)=>{

        //     if(err){
        //         callback(err,null)
        //     }else{
        //         let newId = data[data.length-1].id +1

        //         data.push({
        //             id: newId,
        //             first_name: students.first_name,
        //             last_name : students.last_name,
        //             email: students.email,
        //             gender: students.gender,
        //             birt_date :students.birt_date
        //         })
                
        //         this.save(data,(err)=>{
        //             if(err){
        //                 callback(err,null)
        //             }else{
        //                 callback(null,`Student Baru Berhasil di tambahkan!`)    
        //             }
        //         })
        //     }
        // })

        let query =` INSERT INTO "students" ("first_name", "last_name", "email", "gender", "birt_date") VALUES ($1, $2, $3, $4, $5)`;

        let params =[students.first_name,students.last_name,students.email,students.gender,students.birt_date]

        pool.query(query,params,err=>{
            if(err) callback(err,null)
            else callback(null,`Student Baru Berhasil di tambahkan !`)
        })

    }

    // static save(data,callback){

    //     fs.writeFile(`./student.json`,JSON.stringify(data,null,2),`utf8`,(err)=>{
    //         if(err) callback(err)
    //         else callback(null)
    //     })

    // }

    static delete(studentId,callback){
        // this.open((err,data)=>{
        //     if(err){
        //         callback(err,null)
        //     }else{
        //         let newStudents=[]
        //         data.forEach(element => {
        //             if(studentId != element.id){
        //                 newStudents.push(element)
        //             }
        //         })

        //         this.save(newStudents,(err)=>{
        //             if(err){
        //                 callback(err,null)
        //             }else{
        //                 callback(null,`Student dengan Id :${studentId} Berhasil di detele`)
        //             }
        //         })
        //     }
        // })

        let query ='DELETE FROM students WHERE id = $1'
        let params = [studentId]
        pool.query(query,params,(err,data)=>{
            if(err) callback(err,null)
            else callback(null,` Student dengan Id : ${studentId}, berhasil di delete`)
        })
    }

    static editGet(studentId,callback){
        // this.open((err,data)=>{
        //     if(err){
        //         callback(err,null)
        //     }else{
        //         let student ={}
        //         data.forEach(element => {
        //             if(studentId == element.id){
        //                 student = element
        //             }
        //         })

        //         callback(null,student)
        //     }
        // })

        
        let query = ` SELECT * FROM students WHERE id = $1`

        let params =[studentId]

        pool.query(query,params, (err,data) =>{
            if(err) callback(err,null)
            else callback(null,data.rows[0])
        })

    }

    static editPost(editStudent,callback){
        // this.open((err,data)=>{
        //     if(err){
        //         callback(err,null)
        //     }else{

        //         for (let i = 0; i < data.length; i++) {
        //             if(data[i].id == editStudent.id ){
        //                 data[i]={
        //                     id:data[i].id,
        //                     first_name: editStudent.first_name,
        //                     last_name: editStudent.last_name,
        //                     email: editStudent.email,
        //                     gender: editStudent.gender,
        //                     birt_date: editStudent.birt_date
        //                 }
        //             }
        //         }
 
        //         this.save(data ,(err)=>{
        //             if(err){
        //                 callback(err,null)
        //             }else{
        //                 callback(null,` Data Students dengan Id : ${editStudent.id} berhasil di Edit`)
        //             }
        //         })
        //     }
        // })

        let query =` UPDATE students SET first_name = $1, last_name = $2, email = $3, gender = $4, birt_date = $5 WHERE id = $6`

        let params = [editStudent.first_name,editStudent.last_name,editStudent.email,editStudent.gender,editStudent.birt_date,editStudent.id]

        pool.query(query,params,(err,data)=>{
            if(err) callback(err,null)
            else callback(null,`Data Students dengan ID : ${editStudent.id} berhasil di edit`)
        })
    }

}


module.exports = StudentModel