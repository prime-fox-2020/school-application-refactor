const SubjectModel = require('../models/SubjectModel')

class SubjectController{
    static get(req, res) {
        SubjectModel.get((err, data) => {
            if (err) {
                res.render('error', { error: err });
            } else {
                res.render('subject', { object: data });
            }
        })
    }

}

module.exports = SubjectController;