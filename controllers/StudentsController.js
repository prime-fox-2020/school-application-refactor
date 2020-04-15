const studentsModel = require("../models/studentsModel");

class StudentsController {
  static studentsList(req, res) {
    //baca data dari model => render view students
    studentsModel.getStudents((err, data) => {
      if (err) {
        res.render("error", { error: err });
      } else {
        res.render("students", { data });
      }
    });
  }

  static addGet(req, res) {
    res.render("addStudents", {error:null});
  }

  static addPost(req, res) {
    const errors = [];
    if (!req.body.first_name) errors.push("first name tidak boleh kosong");
    if (!req.body.last_name) errors.push("last name tidak boleh kosong");
    if (!req.body.email) errors.push("email tidak boleh kosong");
    if (!req.body.gender) errors.push("gender tidak boleh kosong");
    if (!req.body.birth_date) errors.push("birth_date tidak boleh kosong");
    
    if (errors.length > 0){
      res.render('addStudents', {error: errors.join(', ')})
    } else {
      studentsModel.addPost(req.body, (err, data) => {
        if (err) {
          res.render("error", { error: err });
        } else {
          res.redirect("/students");
        }
      });
    }
  }

  static delete(req, res) {
    studentsModel.delete(Number(req.params.id), (err, data) => {
      if (err) {
        res.send("error", { error: err });
      } else {
        res.redirect("/students");
      }
    });
  }

  static editGet(req, res) {
    studentsModel.editGet(Number(req.params.id), (err, data) => {
      if (err) {
        res.send("error", { error: err });
      } else {
        res.render("editStudents", { data, error: null });
      }
    });
  }

  static editPost(req, res) {
    const errors = [];
    if (!req.body.first_name) errors.push("first name tidak boleh kosong");
    if (!req.body.last_name) errors.push("last name tidak boleh kosong");
    if (!req.body.email) errors.push("email tidak boleh kosong");
    if (!req.body.gender) errors.push("gender tidak boleh kosong");
    if (!req.body.birth_date) errors.push("birth_date tidak boleh kosong");

    if (errors.length > 0) {
      studentsModel.editGet(req.params.id, (err, data) => {
        if (err) res.render("error", { error: err });
        else res.render("editStudents", { data, error: errors.join(", ") });
      });
    } else {
      studentsModel.editPost(req.body, req.params.id, (err, data) => {
        if (err) {
          res.send("error", { error: err });
        } else {
          res.redirect("/students");
        }
      });
    }
  }

  static getEmail (req, res) {
    studentsModel.getEmail(req.params.email, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(data)
        }
    })
  } 
}

module.exports = StudentsController;
