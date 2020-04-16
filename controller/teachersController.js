const TM = require('../model/teachersModel');

class TeacherController {

  static teacherList(req, res) {
    TM.getTeacher((err, data) => {
      if(err) res.render('error', {error: err})
      else res.render('teachers', {data});
    })
  }

  static teacherListId(req, res) {
    TM.getTeacherId(req.params.id, (err, data) => {
      if(err) res.render('error', {error: err})
      else res.render('teachers', {data});
    })
  }

}

module.exports = TeacherController;
