const Subjects = require('../models/subjects');

class SubjectsController {
  static getData(req, res) {
    Subjects.getData((err, data) => {
      if (err) {
        res.render('error');
      } else {
        res.render('subjects', {data});
      }
    })
  }

  static getDataById(req, res) {
    Subjects.getData((err, data) => {
      if (err) {
        res.render('error')
      } else {
        data = data.filter(dat => dat.id == req.params.id);
        res.render('subjects', {data});
      }
    })
  }
}

module.exports = SubjectsController;