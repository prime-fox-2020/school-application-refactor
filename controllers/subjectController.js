const SubjectModel = require('../models/subjectModel')

class SubjectController{
    static subjectListGet(req,res){
        SubjectModel.getSubjectList((err,data) => {
            if (err){
                res.render('errorpage',{error:err})
            } else {
                res.render('subjectpage',{data})
            }
        })
    }

    static subjectListIdGet(req,res){
        SubjectModel.getSubjectIdList(Number(req.params.id), (err,data)=> {
            if (err){
                res.render('errorpage',{error:err})
            } else {
                res.render('subjectpage',{data})
            }
        })
    }
}

module.exports = SubjectController