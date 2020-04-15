const SM = require('../model/subjectsModel');

class SubjectController {

  static subjectList(req, res) {
    SM.getSubject((err, data) => {
      if(err) res.render('error', {error: err})
      else res.render('subjects', {data});
    })
  }

  static subjectListId(req, res) {
    SM.getSubjectId(req.params.id, (err, data) => {
      if(err) res.render('error', {error: err})
      else res.render('subjects', {data});
    })
  }


}

module.exports = SubjectController;
