const routes = require('express').Router()
const TeachersController = require('../controllers/teacherscontroller')

routes.get('/', (req, res) => {
  TeachersController.getTeachers(req, res)
})

module.exports = routes