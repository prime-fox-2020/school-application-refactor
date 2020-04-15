const SubjectModel = require("../models/subjectsModel")

class ControllerSubjects {
    static get(req, res) {
        SubjectModel.getSubjects((err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.render("subjects", { subjects: data })
            }
        })
    }

    static getId(req, res){
        SubjectModel.getId(req.params.id, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.render("subjects", { subjects : data })
            }
        })
    }
}

module.exports = ControllerSubjects