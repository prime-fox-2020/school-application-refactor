const subjectModel = require('../models/subjectModel')

class SubjectController {
    static getSubjectList (req, res) {
        subjectModel.getSubject ((err, data) => {
            if (err) {
                res.send('subject not found')
            }
            else {
                res.render('subject.ejs', { data })
            }
        })
    }
}

module.exports = SubjectController;