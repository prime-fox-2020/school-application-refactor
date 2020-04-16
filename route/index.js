  const express = require('express');
  const router = express.Router()
  const studentsRouter = require('./studentsRouter')
  const homeController = require('../controllers/homeController')

  router.get('/', homeController.home);
  router.use('/students', studentsRouter)

  module.exports = router