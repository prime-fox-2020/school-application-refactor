const SubjectsModel = require('../models/subjectsmodel')

class SubjectsController {
  static getSubjects (req, res) {
    SubjectsModel.subjects((err, data) => {
      if (err) {throw err}
      else (res.render('viewsubjects', {subjects: data}))
    })
  }
}

module.exports = SubjectsController