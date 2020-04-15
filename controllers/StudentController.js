let Model = require('../models/studentsModel')
class StudentController {
    static getStudent(req,res){
        Model.readStudent((err,data)=>{
            if(err) console.log(err)

            res.render('../views/students.ejs', {data: data, email: undefined})
        })
    }

    static getStudentEmail(req,res){
        Model.readStudent((err,data)=>{
            if(err) console.log(err)

            res.render('../views/students.ejs', {data: data, email: req.params.email})
        })
    }

    static addStudent(req,res){
        res.render('../views/addStudent.ejs')
    }

    static editStudent(req,res){
        Model.readStudentId(req.params.id, (err,data)=>{
            if(err) console.log(err)

            res.render('../views/editStudent.ejs', {data: data})
        })
    }

    static deleteStudent(req,res){
        Model.deleteStudent(req.params.id, (err,data)=>{
            if(err) console.log(err)

            console.log(data)
            res.redirect('/students')
        })
    }

    static addStudentPost(req,res){
        let fname = req.body.fname
        let lname = req.body.lname
        let email = req.body.email
        let gender = req.body.gender
        let birthDate = req.body.birthdate
        Model.addStudent(fname, lname, email, gender, birthDate, (err, data)=>{
            if(err) res.send(err)

            console.log(data)
            res.redirect('/students')
        })
    }

    static editStudentPost(req,res){
        let id = req.params.id
        let fname = req.body.fname
        let lname = req.body.lname
        let email = req.body.email
        let gender = req.body.gender
        let birthDate = req.body.birthdate
        Model.editStudent(id, fname, lname, email, gender, birthDate, (err, data)=>{
            if(err) console.log(err)

            console.log(data)
            res.redirect('/students')
        })
    }
}

module.exports = StudentController