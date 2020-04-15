const Teachers = require('../models/teachers');

class TeachersController {
  static getData(req, res) {
    Teachers.getData((err, data) => {
      if (err) {
        res.render('error');
      } else {
        res.render('teachers', {data})
      }
    })
  }

  static getDataById(req, res) {
    Teachers.getData((err, data) => {
      if (err) {
        res.render('error')
      } else {
        data = data.filter(dat => dat.id == req.params.id);
        res.render('teachers', {data});
      }
    })
  }
}

module.exports = TeachersController;