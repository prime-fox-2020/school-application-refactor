const { Router } = require('express')
const route = Router()
// route.get('/', (req,res)=>{
//     res.send('INI HOME')
// })

const teachersRouter = require('./teachers');
const studentsRouter = require('./students');
const subjectsRouter = require('./subjects');
//SHOW

route.use('/teachers',teachersRouter);
route.use('/students', studentsRouter);
route.use('/subjects', subjectsRouter);
route.use('/', (req,res)=>{
    res.render('index.ejs')
})


module.exports = route