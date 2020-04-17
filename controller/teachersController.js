const TeachersModel = require('../model/teachersModel')

class TeachersController {

  static getTeachers(req, res) {
    
    TeachersModel.getTeachers((err, data) => {
      if(err) {
        res.render('error', {error:err})
      } else {
        res.render('teachers', {teachers: data})
      }
    })
  }

  static getId(req, res) {
    TeachersModel.getId(req.params.id, (err, data) => {
      if(err) {
        res.render('error', {error:err})
      } else {
        res.render('teachers', {teachers:data})
      }
    })
  }


}

module.exports = TeachersController