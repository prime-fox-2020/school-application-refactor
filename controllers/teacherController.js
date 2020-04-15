const Model = require('../models/model');

class Controller {
    static showData(req, res) {
        Model.showData('teachers', (err, data) => {
            if (err) res.render('error', {err});
            else res.render('data', {data, alert: req.query.message, table:'teacher'});
        });
    }   

    static addData(req, res) {
        res.render('inputTeacher', {data: [], alert: req.query.message, act: 'ADD'});
    }

    static editData(req,res) {
        Model.editData('teachers' ,+req.params.id, (err, data) => {
            if (err) res.render('error', {err});
            else res.render('inputTeacher', {data: [data], alert: req.query.message, act: 'EDIT'});
        });
    }

    static dataPost(req, res) {
        Model.dataPost('teachers',req.body, req.params.id, (err, message) => {
            if (err) res.render('error', {err});
            else if (message.split(' ')[0] == 'Input') {
                res.render('inputTeacher', {data: [req.body], alert: message, act: req.body.action});
            }
            else res.redirect(`/teacher?message=${message}`);
        });
    }

    static delete(req, res) {
        Model.delete('teachers'+req.params.id, (err, message) => {
            if (err) res.render('error', {err});
            else res.redirect(`/teacher?message=${message}`);
        });
    }
}

module.exports = Controller;