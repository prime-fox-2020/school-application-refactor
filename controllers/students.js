const Student = require('../models/students');

class StudentController {
    static list(req, res) {
        Student.list((err, data) => {
            if(err) {
                res.send(err);
            } else {
                res.render('students.ejs', {students: data});
            }
        });
    }

    static showAddForm(req, res) {  
        res.render('addStudents.ejs', {mode: 'add'});
    }

    static add(req, res) {
        let newStudent = req.body;
        Student.add(newStudent.first_name, newStudent.last_name, newStudent.email, newStudent.gender, newStudent.birth_date, (err, newStudent) => {
            if(err) {
                res.send(err);
            } else {
                res.redirect('/students');
            }
        });
    }

    static getByEmail(req, res) {
        let findEmail = req.params.email;
        Student.getByEmail(findEmail, (err, data) => {
            if(err) {
                res.send(err);
            } else {
                if(data) {
                    res.send(data);
                } else {
                    res.send('Student not found');
                }
            }
        });
    }

    static showEditForm(req, res) {
        let id = Number(req.params.id);
        Student.getById(id, (err, data) => {
            if(err) {
                res.send(err);
            } else {
                if(data) {
                    res.render('addStudents.ejs', {student: data, mode: 'edit'});
                } else {
                    res.send('Student not found');
                }
            }
        });
    }

    static edit(req, res) {
        let id = Number(req.params.id);
        let editedStudentData = req.body;
        Student.getById(id, (err, data) => {
            if(err) {
                res.send(err);
            } else {
                if(data) {
                    Student.edit(id, editedStudentData.first_name, editedStudentData.last_name, editedStudentData.email, editedStudentData.gender, editedStudentData.birth_date, (err) => {
                        if(err) {
                            res.send(err);
                        } else {
                            res.redirect('/students');
                        }
                    });
                } else {
                    res.send('Student not found');
                }
            }
        });
    }

    static delete(req, res) {
        let id = Number(req.params.id);
        Student.getById(id, (err, data) => {
            if(err) {
                res.send(err)
            } else {
                if(data) {
                    Student.delete(id, (err) => {
                        if(err) {
                            res.send(err);
                        } else {
                            res.redirect('/students');
                        }
                    })
                } else {
                    res.send('Student not found');
                }
            }
        });
    }
}

module.exports = StudentController;
