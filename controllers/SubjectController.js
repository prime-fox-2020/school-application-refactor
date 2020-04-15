let Model = require('../models/model')
class SubjectController {
    static getSubject(req,res){
        Model.readSubject((err,data)=>{
            if(err) console.log(err)

            res.render('../views/subjects.ejs', {data: data, id: undefined})
        })
    }

    static getSubjectId(req,res){
        Model.readSubject((err,data)=>{
            if(err) console.log(err)

            res.render('../views/subjects.ejs', {data: data, id: req.params.id})
        })
    }
}

module.exports = SubjectController