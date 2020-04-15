const StudentModel = require('../models/student');

class Student {
    static show(req, res) {
        // res.send('ini di student controller')
        StudentModel.read((err, data) => {
            if (err) {
                res.send(err)
            } else {
                // console.log(data);
                res.render('students', { students: data, msg: null })
            }
        })
    }

    static addGet(req, res) {
        const error = {}
        res.render('addStudent', { error })
    }

    static addPost(req, res) {
        // console.log(req.body);
        StudentModel.add(req.body, (err, data, msg) => {
            if (err) {
                // res.render(`./students/add?err=${JSON.stringify(err)}`, {error: err})
                res.render(`addStudent`, { error: err })
            } else {
                // console.log('data: ', data);
                // console.log('msg: ', msg);
                res.render('students', { students: data, msg: msg })
            }
        })
    }

    static delete(req, res) {
        StudentModel.delete(req.params.id, (err, data, msg) => {
            console.log(req.params.id);
            if (err) {
                res.send(err)
            } else {
                // console.log('data: ', data);
                // console.log('msg: ', msg);
                res.render('students', { students: data, msg: msg })
            }
        })
    }

    static editGet(req, res) {
        StudentModel.edit(req.params.id, (err, data) => {
            if (err) {
                req.send(err)
            } else {
                // console.log(data);
                let err = {}
                res.render('editStudent', { student: data, error: err })
            }
        })
    }

    static editPost(req, res) {
        // console.log(req.body);
        StudentModel.update(req, (err, data, msg) => {
            if (err) {
                data.birth_date = new Date(data.birth_date);
                res.render('editStudent', { student: data, error: err })
            } else {
                res.render('students', { students: data, msg: msg })
            }
        })
    }

    static emailPost(req, res) {
        console.log(req.body.email, ">>>>>");
        StudentModel.emailPost(req.body.email, (err, data, msg) => {
            if (err) {
                res.send(err)
            } else {
                console.log('data: ', data);
                console.log('msg: ', msg);
                res.render('students', { students: [data], msg: msg })
            }
        })
    }
}

module.exports = Student;
