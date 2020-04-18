const teachersModel = require('../models/teachersModel')

class TeachersController {
    static getTeacherList (req, res) {
        teachersModel.read((err, data) => {
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
        teachersModel.readTeachersId(req.params.id, (err, data) => {
            if (err) {
                res.send ('id not found')
            }
            else {
                res.render('teachers.ejs', { data })
            }
        })
    }
}

module.exports = TeachersController;