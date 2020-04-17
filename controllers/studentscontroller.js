const StudentsModel = require('../models/studentsmodel')

class StudentsController {
  static getStudents (req, res) {
    StudentsModel.showStudents((err, data) => {
      if (err) {throw err}
      else {res.render('viewstudents', {students: data})}
    })
  }

  static addStudents(req, res) {
    res.render('addstudents')
  }

  static addPost(req, res) {
    StudentsModel.add(req, (err) => {
      if (err) {throw err}
      else {res.redirect('/students')}
    })
  }

  static editStudents(req, res) {
    StudentsModel.getEdit(req.params.id, (err, data) => {
      if (err) {throw err}
      else {res.render('editstudents', {studentData : data})}
    })
  }

  static editPost(req, res) {
    StudentsModel.edit(req, (err) => {
      if (err) {throw err}
      else {res.redirect('/students')}
    })
  }
  
  static deleteStudents(req, res) {
    StudentsModel.delete(req, (err) => {
      if (err) {throw err}
      else {res.redirect('/students')}
    })
  }
}

module.exports = StudentsController