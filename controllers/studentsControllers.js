const studentsModel = require('../models/studentsModel') 

class studentsController {
    static show(req, res) {
        studentsModel.show((err, data) => {
            if(err) {
                res(render('error', {error: err}))
            } else {
                res.send('students', {students : data})
            }
        })
    }
   static addForm(req, res) {
       res.render('addStudents')
    } 

    static add(req, res) {
        studentsModel.add(req.body.id, req.body.first_name, req.body.last_name, req.body.email, req.body.gender, req.body.birth_date, (err, data) => {
            if(err) {
                if(Array.isArray(err)) {
                    res.render('addStudents', {error: err})
                } else {
                    res.render('error', { error : err})
                }
            } else {
                res.redirect('/students')
            }
        })
    }
   }
   
   module.exports = studentsController