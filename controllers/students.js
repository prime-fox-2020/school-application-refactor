const StudentModel = require("../models/studentsModel")

class ControllerStudents {
    static get(req, res) {
        StudentModel.getStudents((err, data) => {
            if (err) {
                res.render('error',{error:err})
            } else {
                res.render("students", { students: data, alert : req.query})
            }
        })
    }

    static create(req, res) {
        const error = req.query.error
        res.render('addStudent', {error})
    }

    static add(req, res) {
        StudentModel.add(req.body, (err, data) => {
            if (err) {
                if (Array.isArray(err)){
                    res.redirect(`/students/add?error=${err.join(', ')}`)
                } else {
                    res.render('error',{error:err})
                }
            } else {
                res.redirect(`/students?message=${data}&type=success`)
            }
        })
    }

    static destroy(req, res) {
        StudentModel.delete(req.params.id, (err, data) => {
            if (err) {
                res.render('error',{error:err})
            } else {
                res.redirect(`/students?message=${data}&type=success`)
            }
        })
    }

    static formEdit(req, res) {
        const error = req.query.error
        StudentModel.getEdit(req.params.id, (err, data) => {
            if (err) {
                res.render('error',{error:err})
            } else {
                res.render('editStudent', {students: data, error})
            }
        })
    }

    static update(req, res) {
        StudentModel.update(Number(req.body.studentId), req.body, (err, data) => {
            if (err) {
                if(Array.isArray(err)){
                    res.redirect(`/students/${req.params.studentId}/edit?error=${err.join(', ')}`)
                } else {
                    res.render('error',{error:err})
                }
            } else {
                res.redirect(`/students?message=${data}&type=success`)
            }
        })
    }

    static getEmail(req, res){
        StudentModel.getEmail(req.params.email, (err, data) => {
            if (err) {
                res.render('error',{error:err})
            } else {
                res.render('students', {students: data, alert : req.query})
            }
        })
    }
}

module.exports = ControllerStudents