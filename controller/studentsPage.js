// const fs = require('fs')
// const students = JSON.parse(fs.readFileSync('./students.json', 'utf8'))
// const routes = require('express').Router()
const studentsModel = require('../models/studentsModel')


class StudentsController {
    static getStudentsList (req, res) {
        studentsModel.getStudents ((err, data) => {
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
        studentsModel.studentPost(req.body, (err, data) => {
            if (err) {
                res.send('No new student data found')
            }
            else {
                res.redirect('/students')
            }
        })
    }

    static getEditStudent (req, res) {
        studentsModel.editStudents(req.params.id, (err, data) => {
            if (err) {
                res.send(err)
            }
            else {
                let populatedStudent = [];
                populatedStudent.push(data.first_name, data.last_name, data.email)
                // for (let i = 0; i < data.length; i++) {
                //     if (data[i].id == req.params.id) {
                //     }
                // }
                // console.log(data)
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
        studentsModel.postEditStudents(id, first_name, last_name, email, (err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                res.redirect('/students')
            }
        })
    }

    static deleteStudent (req, res) {
        studentsModel.deleteStudent(req.params.id, (err, data) => {
            if (err) {
                res.send('Unable to delete data')
            }
            else {
                res.redirect('/students')
            }
        })
    }

    static getEmail (req, res) {
        studentsModel.getEmail(req.params.email, (err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(data)
            }
        })
    }
}

// routes.get('/', (req, res) => {
//     res.render('students.ejs', {
//         students : students
//     })
// })

// routes.get ('/add_student', (req, res) => {
//     res.render('add_student.ejs');
// })

// routes.post('/add_student', (req, res) => {
//     // res.send(req.body)
//     const idStudent = students[students.length-1].id + 1;
//     const firstname = req.body.firstname
//     const lastname = req.body.lastname
//     const emailStudent = req.body.email
//     let genderStudent = req.body.gender
//     if (genderStudent == 1) {
//         genderStudent = 'male';
//     }
//     else {
//         genderStudent = 'female';
//     }
//     const dob = req.body.birth_date
    
//     students.push({id : idStudent, first_name : firstname, last_name : lastname, email : emailStudent, gender : genderStudent, birth_date : dob})
//     fs.writeFileSync('./students.json', JSON.stringify(students, null, 2))
//     res.redirect('/students')

// })

// routes.get('/:id/delete', (req, res) => {
//     let paramId = req.params.id;
//     for (let i = 0; i < students.length; i++) {
//         if (students[i].id == paramId) {
//             students.splice(i, 1)
//         }
//     }
//     fs.writeFileSync('./students.json', JSON.stringify(students, null, 2))
//     res.redirect('/students')
//     // res.send('Data deleted')
// })

// routes.get('/:id/edit', (req, res) => {
//     let paramId = req.params.id
//     let populatedStudent = [];
//     for (let i = 0; i < students.length; i++) {
//         if (students[i].id == req.params.id) {
//             populatedStudent.push(students[i].first_name, students[i].last_name, students[i].email)
//         }
//     }
//     console.log(populatedStudent)
//     res.render('edit_student.ejs', {
//         paramId : paramId,
//         populatedStudent : populatedStudent
//     })
// })

// routes.post('/:id/edit', (req, res) => {
//     // res.send(req.params.id)
//     for (let i = 0; i < students.length; i++) {
//         if (students[i].id == req.params.id) {
//             // res.send('masuk if')
//             students[i].first_name = req.body.firstname;
//             students[i].last_name = req.body.lastname;
//             students[i].email = req.body.email;
//         }
//     }
//     fs.writeFileSync('./students.json', JSON.stringify(students, null, 2))
//     res.redirect('/students')
// })

// routes.get ('/:email', (req, res) => {
//     for (let i = 0; i < students.length; i++) {
//         if (students[i].email == req.params.email) {
//             res.send(students[i])
//         }
//     }
// })

module.exports = StudentsController;