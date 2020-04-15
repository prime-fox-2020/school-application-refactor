const router = require('express').Router();
const StudentsController = require('../controllers/studentsController');

//students
router.get('/', StudentsController.getData);
router.get('/add', StudentsController.addDataGet);
router.post('/add', StudentsController.addData);
router.get('/:id/edit', StudentsController.editDataGet);
router.post('/:id/edit', StudentsController.editData);
router.get('/:id/delete', StudentsController.deleteData);
router.get('/:email', StudentsController.getDataByEmail);
router.post('*', StudentsController.searchByEmail);

module.exports = router;