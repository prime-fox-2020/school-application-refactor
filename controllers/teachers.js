const TeachersModel = require("../models/teachersModel")

class ControllerTeachers {
    static get(req, res) {
        TeachersModel.getTeachers((err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.render("teachers", { teachers: data })
            }
        })
    }

    static getId(req, res){
        TeachersModel.getId(req.params.id, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.render("teachers", { teachers : data })
            }
        })
    }
}

module.exports = ControllerTeachers