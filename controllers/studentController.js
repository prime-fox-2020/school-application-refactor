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
                let date = req.body.birth_date.split('-');

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
                if(date[2] > 31) {
                    errorMsg.push("DD isn't more than 31");
                }
                if(date[1] > 12){
                    errorMsg.push("Are u Have month more than 12?");
                }
                if(date[0] > 2020 || date[0] < 1900){
                    errorMsg.push("You can type this if u live in this century!")
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