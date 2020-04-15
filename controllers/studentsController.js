const Students = require('../models/students');

class StudentsController {
  static getData(req, res) {
    Students.getData((err, data) => {
      if (err) {
        res.render('error', {error: err});
      } else {
        res.render('students', {data, error: false});
      }
    })
  }

  static getDataByEmail(req, res) {
    Students.getData((err, data) => {
      if (err) {
        res.render('error', {error: err})
      } else {
        data = data.filter(dat => dat.email == req.params.email);
        let error = false;
        if (!data.length) error = true;
        res.render('students', {data, error})
      }
    })
  }

  static addDataGet(req, res) {
    const title = 'Add';
    const edit = {
      first_name: null,
      last_name: null,
      email: null,
      birth_date: null
    };
    res.render('students_form', {err: null, title, edit});
  }

  static addData(req, res) {
    Students.addData(req.body.first_name, req.body.last_name, req.body.email, req.body.birth_date, err => {
      if (Array.isArray(err)) {
        const edit = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          birth_date: req.body.birth_date
        };
        res.render('students_form', {err: err.join(', '), title: 'Add', edit})
      } else {
        if (err) {
          res.render('error', {error: err});
        } else {
          res.redirect('/students');
        }
      }
    })
  }

  static editDataGet(req, res) {
    Students.editDataGet((err, data) => {
      const title = 'Edit';
      if (err) {
        res.render('error', {error: err});
      } else {
        const id = req.params.id;
        let flag = true;
        data.forEach(dat => {
          if (dat.id == id) {
            flag = false;
            res.render('students_form', {err: null, edit: dat, id, title});
          }
        })
        if (flag) {
          res.render('error', {error: `Data dengan id ${id} tidak ditemukan`})
        }
      }
    })
  }

  static editData(req, res) {
    Students.editData(req.body.first_name, req.body.last_name, req.body.email, req.body.birth_date, Number(req.params.id), (err, data) => {
      if (Array.isArray(err)) {
        const edit = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          birth_date: req.body.birth_date
        };
        res.render('students_form', {err: err.join(', '), edit, id: Number(req.params.id), title: 'Edit'});
      } else {
        if (err) {
          res.render('error', {error: err});
        } else {
          res.redirect('/students');
        }
      }
    })
  }

  static deleteData(req, res) {
    Students.deleteData(Number(req.params.id), (err, data) => {
      if (Array.isArray(err)) {
        res.render('error', {error: err})
      } else {
        if (err) {
          res.render('error', {error: err});
        } else {
          res.redirect('/students');
        }
      }
    })
  }

  static searchByEmail(req, res) {
    res.redirect(`/students/${req.body.search}`);
  }
}

module.exports = StudentsController;