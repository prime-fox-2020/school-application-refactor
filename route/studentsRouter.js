const express = require('express');
const router = express.Router()
const studentsController = require('../controllers/studentsControllers')

router.get('/', studentsController.show);
router.get('/add', studentsController.addForm)
router.post('/add', studentsController.add)


module.exports = router