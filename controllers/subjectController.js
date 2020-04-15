const Model = require('../models/model');

class Controller {
    static showData(req, res) {
        Model.showData('subjects', (err, data) => {
            if (err) res.render('error', {err});
            else res.render('data', {data, alert: req.query.message, table: 'subject'});
        });
    }   

    static addData(req, res) {
        res.render('inputSubject', {data: [], alert: req.query.message, act: 'ADD'});
    }

    static editData(req,res) {
        Model.editData('subjects' ,+req.params.id, (err, data) => {
            if (err) res.render('error', {err});
            else res.render('inputSubject', {data: [data], alert: req.query.message, act: 'EDIT'});
        });
    }

    static dataPost(req, res) {
        Model.dataPost('subjects' ,req.body, req.params.id, (err, message) => {
            if (err) res.render('error', {err});
            else if (message.split(' ')[0] == 'Input') {
                res.render('inputSubject', {data: [req.body], alert: message, act: req.body.action});
            }
            else res.redirect(`/subject?message=${message}`);
        });
    }

    static delete(req, res) {
        Model.delete('subjects',+req.params.id, (err, message) => {
            if (err) res.render('error', {err});
            else res.redirect(`/subject?message=${message}`);
        });
    }
}

module.exports = Controller;