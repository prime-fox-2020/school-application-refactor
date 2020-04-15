const StudentModel = require('../models/studentModel');

class StudentController{
    static read(req, res){
        StudentModel.read((err, data) => {
            if(err){
                res.render('error');
            } else {
                res.render('student', {data, message: req.query.message});
            }
        })
    }

    static add_get(req, res){
        StudentModel.add_get((err, data) => {
            if(err){
                res.render('error');
            } else {
                res.render('student_add', {error: req.query.error});
            }
        })
    }

    static add_post(req, res){
        StudentModel.add_post(req, (err, data) => {
            if(err){
                let errorMsg = [];
                if(req.body.first_name === ''){
                    errorMsg.push('First Name is Empty!');
                }
                if(req.body.last_name === ''){
                    errorMsg.push('Last Name is Empty!');
                }
                if(req.body.email === ''){
                    errorMsg.push('Email is Empty!');
                }
                if(req.body.gender === undefined){
                    errorMsg.push('Gender is Empty!');
                }
                if(req.body.birth_date === ''){
                    errorMsg.push('Birth Date is Empty!');
                }

                res.redirect(`/students/add?error=${errorMsg.join(' ')}`);
            } else {
                res.redirect(`/students?message=SuccessAddData`);
            }
        })
    }

    static getEmail(req, res){
        StudentModel.getEmail(req.params.email, (err, data) => {
            if(err){
                res.render('error');
            } else {
                res.send(data);
            }
        })
    }

    static edit_get(req, res){
        StudentModel.edit_get(req.params.id, (err, data) => {
            if(err){
                res.render('error');
            } else {
                res.render('student_edit', {el: data.el, id: req.params.id, birth_date: data.birth_date});
            }
        })
    }

    static edit_post(req, res){
        StudentModel.edit_post(req.params.id ,req.body, (err, data) => {
            if(err){
                res.render('error');
            } else {
                res.redirect('/students');
            }
        })
    }

    static delete(req, res){
        StudentModel.delete(req.params.id, (err, data) => {
            if(err){
                res.render('error');
            } else {
                res.redirect('/students');
            }
        })
    }
}

module.exports = StudentController;