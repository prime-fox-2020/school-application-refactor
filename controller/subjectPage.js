const subjectModel = require('../models/subjectModel')

class SubjectController {
    static getSubjectList (req, res) {
        subjectModel.read ((err, data) => {
            if (err) {
                res.send('subject not found')
            }
            else {
                res.render('subject.ejs', { data })
            }
        })
    }
    
    static getSubjectId (req, res) {
        subjectModel.readId(req.params.id, (err, data) => {
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