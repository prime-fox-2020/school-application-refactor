const router = require('express').Router();
const TeachersController = require('../controllers/teachersController');

//teachers
router.get('/', TeachersController.getData);
router.get('/:id', TeachersController.getDataById);

module.exports = router;