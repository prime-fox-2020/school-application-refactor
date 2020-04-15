const ModelStudents = require('../models/ModelStudents')

class StudentsController{
    static getPage(req, res){
        ModelStudents.getStudents( (err, data) => {
            if(err){
                res.render('error', {error: err})
            }
            else{
                res.render('students', {data, alert : req.query})
            }
        })
    }
    static addPage(req, res){
        let error = req.query
        res.render('add-student', {error: error})
    }
    static postAddPage(req, res){
        ModelStudents.write(req.body, (err, data) => {
            if(err){
                if(Array.isArray(err)){
                    res.redirect(`/students/add?error=${err.join(', ')}`)
                }
                else {
                    res.render('error', {error: err})
                }
            }
            else{
                res.redirect(`/students?message=${data}&type=success`)
            }
        })
    }

    static delete(req, res) {
        ModelStudents.delete(Number(req.params.id), (err, data) => {
            if(err){
                res.render('error', {error : err})
            }
            else{
                res.redirect(`/students?message=${data}&type=success`)
            }
        })
    }
    static editPage(req, res){
        let error = req.query
        ModelStudents.readWithId(Number(req.params.id), (err, data) => {
            if(err){
                res.render('error', {error : err})
            }
            else{
                res.render('edit-student', {data, error})
            }
        })
    }

    static postEditPage(req, res){
        ModelStudents.update(req.body, (err, data) => {
            if(err){
                if(Array.isArray(err)){
                    res.redirect(`/students/${req.params.id}/edit?error=${err.join(', ')}`)
                }
                else {
                    res.render('error', {error: err})
                }
            }
            else{
                res.redirect(`/students?message=${data}&type=success`)
            }
        })
    }

    static pageWithEmail(req, res){
        ModelStudents.getPageEmail (req.params.email, (err, data) => {
            if(err){
                res.render('error', {error: err})
            }
            else{
                res.render('students', {data, alert : 'manipulate email data'})
            }
        })
    }
}


module.exports = StudentsController;