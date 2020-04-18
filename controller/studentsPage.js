const studentsModel = require('../models/studentsModel')


class StudentsController {
    static getStudentsList (req, res) {
        studentsModel.read ((err, data) => {
            if (err) {
                res.send('Students not found')
            }
            else {
                res.render('students.ejs', { data })
            }
        })
    }

    static addStudent (req, res) {
        res.render('add_student.ejs')
    }

    static postStudent (req, res) {
        studentsModel.update(req.body, (err, data) => {
            if (err) {
                res.send('No new student data found')
            }
            else {
                res.redirect('/students')
            }
        })
    }

    static getEditStudent (req, res) {
        studentsModel.readEditStudents(req.params.id, (err, data) => {
            if (err) {
                res.send(err)
            }
            else {
                let populatedStudent = [];
                populatedStudent.push(data.first_name, data.last_name, data.email)
                res.render('edit_student.ejs', {
                    paramId : req.params.id,
                    populatedStudent : data
                })
            }
        })
    }

    static postEditStudent (req, res) {
        let id = req.params.id;
        let first_name = req.body.firstname;
        let last_name = req.body.lastname;
        let email = req.body.email;
        studentsModel.updateEditStudents(id, first_name, last_name, email, (err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                res.redirect('/students')
            }
        })
    }

    static deleteStudent (req, res) {
        studentsModel.delete(req.params.id, (err, data) => {
            if (err) {
                res.send('Unable to delete data')
            }
            else {
                res.redirect('/students')
            }
        })
    }

    static getEmail (req, res) {
        studentsModel.readEmail(req.params.email, (err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                res.render('students.ejs', { data })
            }
        })
    }
}

module.exports = StudentsController;