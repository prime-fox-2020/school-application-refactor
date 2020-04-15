const SubjectModel = require('../models/SubjectModel')

class SubjectController{
    static get(req, res){
        SubjectModel.get((err, data) => {
            if(err){
                res.send(err)
            } else{
                res.render('subject', {object : data.rows})
            }
        })
    }
}

module.exports = SubjectController