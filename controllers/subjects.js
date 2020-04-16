const Subject = require('../models/subjects');

class SubjectController {
    static list(req, res) {
        Subject.list((err, data) => {
            if(err) {
                res.send(err);
            } else {
                res.render('subjects.ejs', {subjects: data});
            }
        })
    }

    static getById(req, res) {
        const findId = Number(req.params.id);
        Subject.getById(findId, (err, subject) => {
            if(err) {
                res.send(err);
            } else {
                if(subject) {
                    res.send(subject);
                } else {
                    res.send('Subject not found');
                }
            }
        })
    }
}

module.exports = SubjectController