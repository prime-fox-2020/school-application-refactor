const TeachersModel = require('../models/teachers')

class TeachersController {
    static getAll(req, res) {
        TeachersModel.getAll((err, data) => {
            if (err) {
                res.render('error', {error: err})
            } else {
                res.render('teachers', { teachers: data })
            }
        })
    }

    static getByID(req, res) {
        TeachersModel.getByID(req.params.id, (err, data) => {
            if (err) {
                res.render('error', {error: err})
            } else {
                res.render('teachers', { teachers : data })
            }
        })
    }
}

module.exports = TeachersController