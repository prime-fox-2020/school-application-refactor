const router = require('express').Router();
const SubjectsController = require('../controllers/subjectsController');

//subjects
router.get('/', SubjectsController.getData);
router.get('/:id', SubjectsController.getDataById);

module.exports = router;