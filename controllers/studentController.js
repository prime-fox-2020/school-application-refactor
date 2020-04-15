const StudentModel = require('../models/studentModel')

class StudentController{
    static studentListGet(req, res){
        StudentModel.getStudentList((err,data) => {
            if (err){
                res.render('errorpage',{error:err})
            } else {
                res.render('studentpage',{data})
            }
        })
    }
    static addStudentGet(req,res){
        const error = req.query
        res.render('addstudent',{error})
    }
    static addStudentPost(req,res){
        // res.send(req.body)
        StudentModel.addStudentPost(req.body, (err,data)=>{
            if(err){
                if (Array.isArray(err)){
                    res.redirect(`/student/add?error=${err.join(', ')}`)
                } else {
                    res.render('errorpage',{error:err})
                }
            } else {
                res.redirect('/student')
                // res.render('studentpage',{data})
            }
        })
    }

    static editStudentGet(req,res){
        const error = req.query
        StudentModel.editStudentGet(Number(req.params.id), (err,data)=> {
            if(err){
                res.render('errorpage',{error:err})
            } else {
                
                res.render('editstudent',{data, error})
            }
        })
    }
    static editStudentPost(req,res){
        const updatedStudent = {
            id : Number(req.params.id),
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            gender : req.body.gender,
            birth_date : req.body.birth_date
        }
        StudentModel.editStudentPost(updatedStudent, (err,data) => {
            if(err){
                if(Array.isArray(err)){
                    res.redirect(`/student/${req.params.id}/edit?error=${err.join(', ')}`)
                } else {
                    res.render('errorpage',{error:err})
                }
            } else {
                res.redirect('/student')
            }
        })
    }

    static deleteStudentGet(req,res){
        StudentModel.deleteStudentGet(Number(req.params.id), (err,data) => {
            if(err){
                res.render('errorpage',{error:err})
            } else {
                res.redirect('/student')
            }
        })
    }

    static emailStudentGet(req,res){
        StudentModel.emailStudentGet(req.params.email, (err,data) => {
            if(err){
                res.render('errorpage',{error:err})
            } else {
                res.render('studentpage', {data})
            }
        })
    }
}

module.exports = StudentController