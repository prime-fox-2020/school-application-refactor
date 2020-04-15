const StudentModel = require('../models/StudentModel')

class StudentController{
    static get(req, res){
        StudentModel.get((err, data) => {
            if(err){
                res.send(err)
            }else{
                // res.send(data.rows)
                res.render('student', {object: data.rows})
            }
        })
    }

    static addForm(req, res){
        res.render('addform')
    }
    static add(req, res){
        // res.send(req.body)
        StudentModel.add(req.body.first_name, req.body.last_name, req.body.email, req.body.gender, req.body.birth_date, (err, data) => {
            if(err){
                res.send(err)
            } else{
                // res.send(data.rows)
                res.redirect('/student')
            }
        })
    }

    static editForm(req, res) {
        StudentModel.editForm(Number(req.params.id), (err, data) => {
            if(err){
                res.send(err)
            } else{
                res.render('editform', {object: data})
                // res.render('editform', {object : data.rows})
            }
        })
    }

    static edit(req, res){
        StudentModel.edit(req.body.first_name, req.body.last_name, req.body.email, req.body.gender, req.body.birth_date, req.params.id, (err, data) => {
            if(err){
                res.send(err)
            } else{
            // res.send(req.body)
                res.redirect('/student')
            }
        })
    }

    static delete(req, res){
        StudentModel.delete(Number(req.params.id), (err, data) => {
            if(err){
                res.send(err)
            } else{
                res.redirect('/student')
            }
        })
    }
}

module.exports = StudentController