//get data from model
const STM = require('../model/studentsModel');

class StudentsController {

  static studentList(req, res) {
    STM.getStudent((err, data) => {
      if(err) res.render('error', {error: err})
      else res.render('students', {data});
    });
  }

  static studentEmail(req, res) {
    STM.getEmail(req.params.email, (err, data) => {
      if(err) res.render('error', {error: err});
      else res.render('students', {data});
    })
  }

  static add(req, res) {
    res.render('add');
  }

  static addPost(req, res) {
    STM.addStudent(req.body.firstName, req.body.lastName, req.body.email, req.body.gender, req.body.birthdate, (err, data) => {
      if(err) res.render('error', {error: err});
      else res.redirect('/students');
    })
  }

  static edit(req, res) {
    STM.getStudentID(Number(req.params.id), (err, data) => {
      if(err) res.render('error', {error: err})
      res.render('edit', {data});
    });
  }

  static editPost(req, res) {
    STM.editStudent(req.params.id, req.body.firstName, req.body.lastName, req.body.email, req.body.gender, req.body.birthdate, (err, data) => {
      if(err) res.render('error', {error: err});
      else console.log(data); 
      res.redirect('/students');
    })
  }

  static deleteStudentById(req, res) {
    STM.deleteStudent(req.params.id, (err, data) => {
    if(err) res.render('error', {error: err})
    else res.redirect('/students');
  })
}

}

//send data to routes (students.js)
module.exports = StudentsController;
