const teachers = require('../models/teachers');

class TeacherController {
    static list(req, res) {
        teachers.list((err, data) => {
            if(err) {
                res.send(err);
            } else {
                res.render('teachers.ejs', {teachers: data});
            }
        })
    }

    static getID(req,res){
        
        const findId = Number(req.params.id);
        teachers.getById(findId, (err, teacher) => {
            if(err) {
                res.send(err);
            } else {
                if(teacher) {
                    res.send(teacher);
                } else {
                    res.send('Teachers not found');
                }
            }
        })
    }
}

module.exports = TeacherController; 