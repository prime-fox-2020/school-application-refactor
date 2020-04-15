const SubjectModel = require('../models/subjectModel');

class SubjectController {
    static read(req, res){
        SubjectModel.read((err, data) => {
            if(err){
                res.send(err);
            } else {
                res.render('subject', {data});
            }
        })
    }

    static getId(req, res){
        SubjectModel.getId(req.params.id, (err, data) => {
            if(err){
                res.send(err);
            } else {
                res.send(data);
            }
        })
    }
}

module.exports = SubjectController;