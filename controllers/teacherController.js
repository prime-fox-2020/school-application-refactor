const TeacherModel = require('../models/teacherModel');

class TeacherController{
    static read(req, res){
        TeacherModel.read((err, data) => {
            if(err){
                res.send(err);
            } else {
                res.render('teacher', {data});
            }
        })
    }

    static getId(req, res){
        TeacherModel.getId(req.params.id, (err, data) => {
            if(err){
                res.send(err);
            } else {
                res.send(data);
            }
        })
    }
}

module.exports = TeacherController;