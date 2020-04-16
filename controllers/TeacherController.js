const TeacherModel = require('../models/TeacherModel')

class TeacherController{
    static get(req, res){
        TeacherModel.get((err, data) => {
            if(err){
                res.send(err)
            } else{
                // res.send(data.rows)
                res.render('teacher', {object : data.rows})
            }
        })
    }
}

module.exports = TeacherController