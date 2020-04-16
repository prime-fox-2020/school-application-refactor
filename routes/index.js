const routes = require('express').Router()
const HomeController = require('../controllers/homecontroller')
const studentsRoute = require('./students')
const teachersRoute = require('./teachers')
const subjectsRoute = require('./subjects')

routes.get('/', (req, res) => {
  HomeController.getHome(req, res)
})

routes.use('/teachers', teachersRoute)
routes.use('/students', studentsRoute)
routes.use('/subjects', subjectsRoute)

module.exports = routes