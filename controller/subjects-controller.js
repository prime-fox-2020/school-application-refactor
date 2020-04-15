const SubjectsModel = require('../model/subjects-model.js')

class SubjectsController {
    static showSubjects(req, res) {
        SubjectsModel.showSubjects((err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.render('subjects.ejs', {dataSubjects: data, msg: req.query.message})
            }
        })
    }

    static getAddForm(req, res) {
        res.render('add-subjects.ejs', {id: req.params.id, error: req.query.error, body: req.body})   
    }
    
    static postAdd(req, res) {
        let sn = false;

        if (req.body.subject_name === '' || req.body.subject_name === undefined) {
            res.redirect('/subjects/add?error=Subject Name harus diisi')
        } else {
            sn = true
        }    
    
        if (sn) {
            SubjectsModel.postAdd(req.body, (err, data) => {
                if (err) {
                    res.redirect('/subjects/add')
                } else {
                    res.redirect(`/subjects?message=berhasil menambahkan subject dengan nama ${req.body.subject_name}`)
                }
            })
        }
    }

    static getEditForm(req, res) {
        SubjectsModel.getEditForm(req.params.id, (err, data) => {
            if (err) {
                res.render('error-views.ejs')
            } else {
                let id = req.params.id                
                res.render('edit-subjects.ejs', {id, data})
            }
        })
    }

    static postEdit(req, res) {
        SubjectsModel.postEdit(req.body, req.params.id, (err, data) => {
            if (err) {
                res.render('error-views.ejs', {error: err})
            } else {
                res.redirect(`/subjects?message=berhasil edit subject dengan id ${req.params.id}`)
            }
        })
    }

    static deleteSubject(req, res) {
        SubjectsModel.deleteSubject(req.params.id, (err, data)=> {
            if (err) {
                res.render('error-views.ejs', {error: err})
            } else {
                res.redirect(`/subjects?message=berhasil menghapus subject dengan id ${req.params.id}`)
            }
        })
    }
}

module.exports = SubjectsController