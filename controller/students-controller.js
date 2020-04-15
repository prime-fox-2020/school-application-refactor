const StudentsModel = require('../model/students-model.js')

class StudentsController {
    static showStudents(req, res) {
        StudentsModel.showStudents((err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.render('students.ejs', {dataStudents: data, msg: req.query.message})
            }
        })
    }

    static getAddForm(req, res) {
        res.render('add-students.ejs', {id: req.params.id, error: req.query.error, body: req.body})   
    }
    
    static postAdd(req, res) {
        let fn = false;
        let ln = false;
        let eml = false;
        let bd = false;
        if (req.body.first_name === '' || req.body.first_name === undefined) {
            res.redirect('/students/add?error=First Name harus diisi')
        } else {
            fn = true
        }    
        
        if (req.body.last_name === '' || req.body.last_name === undefined) {
            res.redirect('/students/add?error=Last Name harus diisi')
        } else {
            ln = true
        }   
        
        if (req.body.email === '' || req.body.email === undefined) {
            res.redirect('/students/add?error=Email harus diisi')
        } else if (req.body.email) {
            if (req.body.email.includes('@')) {
                eml = true;
            } else {
                res.redirect('/students/add?error=Email harus ada character @')
            }
        }
    
        if (req.body.birth_date === '' || req.body.birth_date === undefined) {
            res.redirect('/students/add?error=Birth Date harus diisi')
        } else {
            bd = true
        } 

        if (fn && ln && eml && bd) {
            StudentsModel.postAdd(req.body, (err, data) => {
                if (err) {
                    res.redirect('/students/add?error=Format date salah')
                } else {
                    res.redirect(`/students?message=berhasil menambahkan student dengan nama ${req.body.first_name} ${req.body.last_name}`)
                }
            })
        }
    }

    static getEditForm(req, res) {
        StudentsModel.getEditForm(req.params.id, (err, data) => {
            if (err) {
                res.render('error-views.ejs')
            } else {
                let id = req.params.id
                // console.log(id);
                
                res.render('edit-students.ejs', {id, data})
            }
        })
    }

    static postEdit(req, res) {
        StudentsModel.postEdit(req.body, req.params.id, (err, data) => {
            if (err) {
                res.render('error-views.ejs', {error: err})
            } else {
                res.redirect(`/students?message=berhasil edit student dengan id ${req.params.id}`)
            }
        })
    }

    static deleteStudent(req, res) {
        StudentsModel.deleteStudent(req.params.id, (err, data)=> {
            if (err) {
                res.render('error-views.ejs', {error: err})
            } else {
                res.redirect(`/students?message=berhasil menghapus student dengan id ${req.params.id}`)
            }
        })
    }

    static searchStudentByEmail(req, res) {
        console.log(req.body.email);
        
        StudentsModel.searchStudentByEmail(req.body.email, (err, data)=> {
            if (err) {
                res.render('error-views.ejs', {error: err})
            } else {
                let email = req.body.email
                res.render('student-by-email.ejs', {data, email})
            }
        })
    }
}

module.exports = StudentsController