const routes = require('express').Router()
const SubjectsController = require('../controllers/subjectscontroller')

routes.get('/', (req, res) => {
  SubjectsController.getSubjects(req, res)
})

module.exports = routes