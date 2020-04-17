const SubjectsModel = require('../model/subjectsModel')

class SubjectsController {

  static getSubjects(req, res) {
    SubjectsModel.getSubjects((err, data) => {
      if(err) {
        res.render('error', {error: err})
      } else {
        res.render('subjects', {subjects: data})
      }
    })
  }

  static getId(req, res) {
    console.log(req.params.id)
    SubjectsModel.getId(req.params.id, (err, data) => {
      if(err) {
        res.render('error', {error:err})
      } else {
        res.render('subjects', {subjects:data})
      }
    })
  }
  
}

module.exports = SubjectsController