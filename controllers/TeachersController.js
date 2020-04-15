const TeachersModel = require("../models/teachersModel");

class TeachersController {
  static teachersList(req, res) {
    //baca data dari model => render view students
    TeachersModel.getTeachers((err, data) => {
      if (err) {
        res.render("error", {
          error: err,
        });
      } else {
        res.render("teachers", {
          data,
        });
      }
    });
  }

  static getId(req, res) {
    TeachersModel.getTeachersId(req.params.id, (err, data) => {
      if (err) {
        res.send("id not found");
      } else {
        res.send(data);
      }
    });
  }
}

module.exports = TeachersController;
