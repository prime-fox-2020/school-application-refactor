const express = require('express');
const routes = express.Router();

//get data from controller
const STC = require('../controller/studentsController');


//go to students directory with add as :
routes.get('/', STC.studentList); //student list
routes.get('/add', STC.add); //go to add student page
routes.get('/add', STC.addPost); //add student in student page
// routes.get('/edit', SC.editStudent); //go to edit student page
// routes.get('/:id/edit')
routes.get('/:email', STC.studentEmail); //get student with selected email

//Send data to index (routes)
module.exports = routes;
