
const express = require('express')
const pool = require('../config/connection.js')
const ModelTeachers = require('../model/modelTeachers.js')

class TeachersController {
    static getAll(req, res) {
        ModelTeachers.getAll((err, data) => {
            if (err) {
                res.render('error')
            } else {
                res.render('teachers', { data }) // data di oper ke view. 
            }
        })
    }
    static getId(req, res) {
        ModelTeachers.getId(req.params.id, (err, data) => {
            if (err) {
                res.render('error')
            } else {
                res.render('teachers', { data })
            }
        })
    }
}

module.exports = TeachersController