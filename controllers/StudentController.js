const StudentModel = require('../models/StudentModel')

class StudentController {
    static get(req, res) {
        StudentModel.get((err, data) => {
            if (err) {
                res.render('error', { error: err });
            } else {
                res.render('student', { object: data });
            }
        })
    }

    static add(req, res) {
        res.render('addStudent')
    }

    static addPost(req, res) {
        StudentModel.add(req.body.first_name, req.body.last_name, req.body.email, req.body.gender, req.body.birth_date, (err, data) => {
            if (err) {
                res.render('error', { error: err })
            } else {
                res.redirect('/student')
            }
        })
    }

    static edit(req, res) {
        StudentModel.editById(Number(req.params.id), (err, data) => {
            if (err) {
                res.render('error', { err });
            } else {
                res.render('editStudent', { object: data });
            }
        })
    }

    static editPost(req, res) {
        StudentModel.editPost(Number(req.params.id), req.body.first_name, req.body.last_name, req.body.email, req.body.gender, req.body.birth_date, (err, data) => {
            if (err) {
                if (Array.isArray(err)) {
                    res.redirect(`/student/${req.params.id}/edit?error=${err.join(',')}`);
                } else {
                res.render('error', { error: err });
                }
            } else {
                res.redirect('/student');
            }
        })
    }

    static delete(req, res) {
        StudentModel.delete(Number(req.params.id), (err, data) => {
            if (err) {
                res.render('error', { err });
            } else {
                res.redirect('/student');
            }
        })
    }

}

module.exports = StudentController;