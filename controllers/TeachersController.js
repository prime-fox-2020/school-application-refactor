const TeachersModel = require('../models/TeacherModel');

class TeachersController {
    static showList(req, res) {
        TeachersModel.getList(req, (err, teacherList) => {
            if (err) res.render('error', {msg: err});
            else {
                if (teacherList.length > 0) {
                    res.render('teachers', {teacherList, msg: null});
                } else {
                    const massage = `Teacher with id: ${req.params.id} not found!`;
                    res.render('teachers', {teacherList, msg: null});
                }
            }
        });
    }
}

module.exports = TeachersController;