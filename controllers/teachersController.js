const teachersModel = require('../models/teachersModel')

class TeachersController {

  static getTeachers(req, res){
    
    teachersModel.getTeachers((err, data)=>{
      if (err) res.render(err, {error: err})
      else res.render('teachers', { data })
    })
  }

  static getId(req, res){
    teachersModel.getId(req.params.id, (err, data)=>{
      if (err) {
        res.render('error', {error: err})
      } else {
        res.render('teachers', { data: data, alert: '' })
      }
    })
  }
}

module.exports = TeachersController