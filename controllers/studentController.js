const Model = require('../models/model');

class Controller {
    static showData(req, res) {
        Model.showData('students', (err, data) => {
            if (err) res.render('error', {err});
            else res.render('data', {data, alert: req.query.message, table: 'student'});
        });
    }   

    static addData(req, res) {
        res.render('inputStudent', {data: [], alert: req.query.message, act: 'ADD'});
    }

    static editData(req,res) {
        Model.editData('students' ,+req.params.id, (err, data) => {
            if (err) res.render('error', {err});
            else res.render('inputStudent', {data: [data], alert: req.query.message, act: 'EDIT'});
        });
    }

    static dataPost(req, res) {
        Model.dataPost('students' ,req.body, req.params.id, (err, message) => {
            if (err) res.render('error', {err});
            else if (message.split(' ')[0] !== 'Data') {
                res.render('inputStudent', {data: [req.body], alert: message, act: req.body.action});
            }
            else res.redirect(`/student?message=${message}`);
        });
    }

    static delete(req, res) {
        Model.delete('students',+req.params.id, (err, message) => {
            if (err) res.render('error', {err});
            else res.redirect(`/student?message=${message}`);
        });
    }
}

module.exports = Controller;