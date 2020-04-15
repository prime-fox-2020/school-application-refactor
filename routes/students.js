const router = require('express').Router();

const StudentsController = require('../controller/studentsController');

router.get('/', StudentsController.showStudents);
router.get('/add', StudentsController.addStudents);
router.post('/add', StudentsController.addStudentsPost);
router.get('/:id', StudentsController.getById);
router.get('/:id/edit', StudentsController.editGet);
router.post('/:id/edit', StudentsController.editPost);
router.get('/:email/getEmail', StudentsController.getByEmail);
router.get('/:id/delete', StudentsController.delete)

module.exports = router;
