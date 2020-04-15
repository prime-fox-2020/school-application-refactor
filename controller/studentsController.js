const express = require('express')
const pool = require('../config/connection.js')
const ModelStudents = require('../model/modelStudents.js')

class StudentController {
    static getAll(req, res) {
        ModelStudents.getStudent((err, data) => {
            if (err) {
                res.render('error',{err})
            } else {
                res.render('students', { data }) // data di oper ke view. 
            }
        })
    }
    static getEmail(req, res) {
        ModelStudents.getEmail(req.params.email, (err, data) => {
            if (err) {
                res.render('error',{err})
            } else {
                res.render('students', { data })
            }
        })
    }
    // menampilkan page untuk mengisi data
    static addStudent(req, res) {
        const error =req.query.error
        res.render('add_students',{error})
    }

    static postAdd(req, res) {
        ModelStudents.addStudent(req.body, (err, data) => {
            if (err) {
                if(Array.isArray(err)){
                    res.redirect(`/students/add/?error=${err.join(',')}`)
                }else{
                    res.render('error',{error})
                }
            } else {
                res.render('students', { data })
            }
        })
    }

    static edit(req, res) {
        let id = req.params.id
        const error=req.query.error
        res.render('edit_students',{id,error})
    }
    static postEdit(req, res) {
        ModelStudents.postEdit(req.params.id,req.body, (err, data) => {
            if (err) {
                if(Array.isArray(err)){
                    res.redirect(`/students/edit/:id/?error=${err.join(',')}`)
                }else{
                    res.render('error',{err})
                }
            } else {
                res.render('students', {data})
            }
        })
    }
    static postDelete(req,res){
        ModelStudents.postDelete(Number(req.params.id),(err,data)=>{
        
            if(err){
                res.render('error',{err})
            }else{
                res.render('students',{data})
            }
        })

    }
}



module.exports = StudentController