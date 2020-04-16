const TeachersModel = require('../models/teachersmodel')

class TeachersController {
  static getTeachers(req, res){
    TeachersModel.teachers((err, data) => {
      if (err) {throw err}
      else (res.render('viewteachers', {teachers: data}))
    })
  }
}

module.exports = TeachersController