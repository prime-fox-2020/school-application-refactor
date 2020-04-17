const routes = require('express').Router()
const StudentsController = require('../controllers/studentscontroller')

routes.get('/', (req, res) => {
  StudentsController.getStudents(req, res)
})

routes.get('/add', (req, res) => {
  StudentsController.addStudents(req, res)
})

routes.post('/add', (req, res) => {
  StudentsController.addPost(req, res)
})

routes.get('/edit/:id', (req, res) => {
  StudentsController.editStudents(req, res)
})

routes.post('/edit/:id', (req, res) => {
  StudentsController.editPost(req, res)
})

routes.get('/delete/:id', (req, res) => {
  StudentsController.deleteStudents(req, res)
})

module.exports = routes