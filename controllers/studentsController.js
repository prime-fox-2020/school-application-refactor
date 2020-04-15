const Students = require('../models/students');

class StudentsController {
  static getData(req, res) {
    Students.getData((err, data) => {
      if (err) {
        res.render('error');
      } else {
        res.render('students', {data, error: false});
      }
    })
  }

  static getDataByEmail(req, res) {
    Students.getData((err, data) => {
      if (err) {
        res.render('error')
      } else {
        data = data.filter(dat => dat.email == req.params.email);
        let error = false;
        if (!data.length) error = true;
        res.render('students', {data, error})
      }
    })
  }

  static addDataGet(req, res) {
    const title = 'Add Student Data';
    const edit = {
      first_name: null,
      last_name: null,
      email: null,
      birth_date: null
    };
    res.render('students_form', {err_msg: null, title, edit});
  }

  static addData(req, res) {
    Students.addData(req.body.first_name, req.body.last_name, req.body.email, req.body.birth_date, err => {
      if (err) {
        res.render('error');
      } else {
        res.redirect('/students');
      }
    })
  }

  static editDataGet(req, res) {
    Students.editDataGet((err, data) => {
      const title = 'Edit Student Data';
      if (err) {
        res.render('error');
      } else {
        const id = req.params.id;
        data.forEach(dat => {
          if (dat.id == id) {
            res.render('students_form', {err_msg: null, edit: dat, id, title});
          }
        })
      }
    })
  }

  static editData(req, res) {
    Students.editData(req.body.first_name, req.body.last_name, req.body.email, req.body.birth_date, Number(req.params.id), (err, data) => {
      if (err) {
        res.render('error');
      } else {
        res.redirect('/students');
      }
    })
  }

  static deleteData(req, res) {
    Students.deleteData(Number(req.params.id), (err, data) => {
      if (err) {
        res.render('error');
      } else {
        res.redirect('/students');
      }
    })
  }

  static searchByEmail(req, res) {
    res.redirect(`/students/${req.body.search}`);
  }
}

module.exports = StudentsController;