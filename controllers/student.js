const StudentModel = require('../models/student');

class Student {
    static show(req, res) {
        // res.send('ini di student controller')
        StudentModel.read((err, data) => {
            if (err) {
                res.send(err)
            } else {
                const msg = req.query.msg
                res.render('students', { students: data, msg: msg })
            }
        })
    }

    static addGet(req, res) {
        const error = {}
        res.render('addStudent', { error })
    }

    static addPost(req, res) {
        // console.log(req.body);
        StudentModel.add(req.body, (err, msg) => {
            if (err) {
                res.render(`addStudent`, { error: err })
            } else {
                console.log('msg: ', msg);
                res.redirect(`/students?msg=${msg}`)
            }
        })
    }

    static delete(req, res) {
        StudentModel.delete(req.params.id, (err, msg) => {
            if (err) {
                res.send(err)
            } else {
                res.redirect(`/students?msg=${msg}`)
            }
        })
    }

    static editGet(req, res) {
        StudentModel.edit(req.params.id, (err, data) => {
            if (err) {
                req.send(err)
            } else {
                let err = {}
                console.log(data);
                res.render('editStudent', { student: data, error: err })
            }
        })
    }

    static editPost(req, res) {
        StudentModel.update(req, (err, data) => {
            if (err) {
                data.id = req.params.id
                data.birth_date = new Date(data.birth_date);
                res.render('editStudent', { student: data, error: err })
            } else {
                res.redirect(`/students?msg=${ data }`)
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