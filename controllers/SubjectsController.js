const SubjectsModel = require("../models/subjectsModel");

class SubjectsController {
  static subjectsList(req, res) {
    //baca data dari model => render view students
    SubjectsModel.getSubjects((err, data) => {
      if (err) {
        res.render("error", { error: err });
      } else {
        res.render("subjects", { data });
      }
    });
  }
}

module.exports = SubjectsController