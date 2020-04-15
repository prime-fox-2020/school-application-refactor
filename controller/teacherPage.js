const teachersModel = require('../models/teachersModel')

class TeachersController {
    static getTeacherList (req, res) {
        teachersModel.getTeachers((err, data) => {
            if (err) {
                res.send ('Data not found')
            }
            else {
                console.log(data)
                res.render('teachers.ejs', { data })
            }
        }
    )}

    static getTeachersId (req, res) {
        teachersModel.getTeachersId(req.params.id, (err, data) => {
            if (err) {
                res.send ('id not found')
            }
            else {
                res.send(data)
                // for (let i = 0; i < data.length; i++) {
                //     if (data[i].id == req.params.id) {
                //     }
                // }
            }
        })
    }
}

module.exports = TeachersController;