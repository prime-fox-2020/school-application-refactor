const StudentsModel = require('../models/studentsModel')

class StudentsController{
    static getStudents(req, res) {
        StudentsModel.getStudents((err, data) => {
            if(err) {
                res.render('eror.ejs', {eror : err})
            } else {
                res.render('students.ejs', {data})
            }
        })
    }

    static addStudentsGet(req, res) {
        const error= req.query.error
        res.render('addStudents.ejs', {error})
    }

    static addStudentsPost(req, res) {
        StudentsModel.addStudentsPost(req.body, (err, data) => {
            if(err) {
                if(Array.isArray(err)) {
                    res.redirect(`/students/add?error=${err.join(',')}`)
                }
               //res.render('eror.ejs', {eror : err})
            } else {
                res.redirect('/students')
            }
        })
    }

    static editStudentsGet(req, res) {
        StudentsModel.editStudentsGet(Number(req.params.id), (err, data) => {
            if(err){
                res.render('eror.ejs', {eror : err})
            } else {
                res.render('editStudents.ejs', {data})
            }
        })
    }

    static editStudentsPost(req, res) {
        const updatedStudents = {
            id : Number(req.params.id),
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            gender : req.body.gender,
            birth_date : req.body.birth_date
        }

        StudentsModel.editStudentsPost(updatedStudents, (err, data) => {
            if(err){
                res.render('eror.ejs', {eror : err})
            } else {
                res.redirect('/students')
            }
        })
    }

    static deleteStudents(req, res) {
        StudentsModel.deleteStudents(Number(req.params.id), (err, data) => {
            if(err){
                res.render('eror.ejs', {eror : err})
            } else {
                res.redirect('/students')
            }
        })
    }

    static emailStudents(req, res) {
        StudentsModel.emailStudents(req.params.email, (err, data) => {
            if(err){
                res.render('eror.ejs', {eror : err})
            } else {
                res.render('students', {data})
            }
        })
    }
}

module.exports = StudentsController

