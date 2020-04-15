const StudentsModel = require('../model/studentsModel')


class StudentsController {

  static getStudents(req, res) {
    StudentsModel.getStudents((err, data) => {
      if(err) {
        res.render('error', {error:err})
      } else {
        res.render('students', {students: data,alert:req.query})
      }
    })
  }

  static addStudents(req, res) {
    res.render('add')
  }

  static postAdd(req, res) {
    StudentsModel.postAdd(req.body, (err, data) => {
      if(err) {
        res.render('error', {error: err})
      } else {
        res.redirect(`/students?message=${data}`)
      }
    })
  }

  static getEdit(req, res) {
    StudentsModel.getEdit(Number(req.params.id), (err, data) => {
      if(err) {
        res.render('error', {error: err})
      } else {
        res.render('edit', {data})
      }
    })
  }

  static postEdit(req, res) {
    const edited = {
      id: Number(req.params.id),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,
      birth_date: req.body.birth_date
    }

    StudentsModel.postEdit(edited, (err, data) => {
      if(err) {
        res.render('error', {error:err})
      } else {
        res.redirect(`/students?message=${data}`)
      }
    })
  }

  static getEmail(req, res) {
    StudentsModel.getEmail(req.params.email, (err, data) => {
      if(err) {
        res.render('error', {error:err})
      } else {
        res.render('students', {students:data,alert:''})
      }
    })
  }

  static delete(req, res) {
    StudentsModel.delete(Number(req.params.id), (err, data) => {
      if(err) {
        res.render('error', {error:err})
      } else {
        res.redirect(`/students?message=${data}&type=success`)
      }
    })
  }

}
module.exports = StudentsController