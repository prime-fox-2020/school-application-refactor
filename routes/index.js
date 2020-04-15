const router = require('express').Router();

const teachers = require('./teachersRoute');
const students = require('./studentsRoute');
const subjects = require('./subjectsRoute');

router.get('/', (req, res) => {
  res.render('home.ejs');
})

router.use('/teachers', teachers);
router.use('/students', students);
router.use('/subjects', subjects);

//error
router.get('/*', (req, res) => {
  res.render('error');
})

module.exports = router;