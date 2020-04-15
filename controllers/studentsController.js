const studentsModel = require('../models/studentsModel')

class StudentsController {

  static getStudents(req, res){
    studentsModel.getStudents((err, data)=>{
      if (err){
        res.render(err, {error: err})
      } else {
        res.render('students', { data, alert: req.query })
      }
    })
  }

  static addGet(req, res){
    const error = req.query.error
    res.render('add', {error})
  }

  static addPost(req, res){
    studentsModel.addPost(req.body, (err, data)=>{
      if (err) {
        if(Array.isArray(err)){
          res.redirect(`/students/add?error=${err.join(', ')}`)
        }
      } else {
        res.redirect(`/students?message=${data}&type=success`)
      }
    })
  }

  static delete (req, res){
    studentsModel.delete(Number(req.params.id), (err,data)=>{
      if (err) {
        res.render('error', {error: err})
      } else {
        res.redirect(`/students?message=${data}&type=success`)
      }
    })
  }

  static editGet(req, res){
    const error = req.query.error
    studentsModel.editGet(Number(req.params.id), (err, data)=>{
      if (err) {
        res.render('edit', {error: err})
      } else {
        res.render('edit', { data, error })
      }
    })
  }

  static editPost(req, res){
    const tempData = {
      id: Number(req.params.id),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,  
      birth_date: req.body.birth_date
    }
    studentsModel.editPost(tempData, (err, data)=>{      
      if (err) {
        if(Array.isArray(err)){
          res.redirect(`/students/${tempData.id}/edit?error=${err.join(', ')}`)
        }
      } else {
      res.redirect(`/students?message=${data}&type=success`)
      }
    })
  }

  static getEmail(req, res){
    studentsModel.getEmail(req.params.email, (err, data)=>{
      if (err) {
        res.render('error', {error: err})
      } else {
        res.render('students', { data: data, alert: '' })
      }
    })
  }
}

module.exports = StudentsController