const pool = require('./config/connection');
const fs = require('fs');

const teachersFilePath = './teachers.json';
const studentsFilePath = './students.json';
const subjectsFilePath = './subjects.json';

fs.readFile(teachersFilePath, (err, data) => {
    if (err) {
        throw err;
    } else {
        let parsedJson = JSON.parse(data);
        let teachersData = [];
        for (let i = 0; i < parsedJson.length; i++) {
            let teacher = parsedJson[i];
            teachersData.push(`('${teacher.id}', '${teacher.first_name}', '${teacher.last_name}', '${teacher.email}', '${teacher.gender}')`);
        }
        let queryStr = "INSERT INTO teachers (id, first_name, last_name, email, gender) VALUES " + teachersData.join(', ');
        pool.query(queryStr, (err, res) => {
            if (err) {
                throw err;
            } else {
                console.log('Added "teachers" data successfully');
                fs.readFile(studentsFilePath, (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        let parsedJson = JSON.parse(data);
                        let studentsData = [];
                        for (let i = 0; i < parsedJson.length; i++) {
                            let student = parsedJson[i];
                            studentsData.push(`('${student.id}', '${student.first_name}', '${student.last_name}', '${student.email}', '${student.gender}', '${student.birth_date}')`);
                        }
                        let queryStr = "INSERT INTO students (id, first_name, last_name, email, gender, birth_date) VALUES " + studentsData.join(', ');
                        pool.query(queryStr, (err, res) => {
                            if (err) {
                                throw err;
                            } else {
                                console.log('Added "students" data successfully');
                                fs.readFile(subjectsFilePath, (err, data) => {
                                    if (err) {
                                        throw err;
                                    } else {
                                        let parsedJson = JSON.parse(data);
                                        let subjectsData = [];
                                        for (let i = 0; i < parsedJson.length; i++) {
                                            let subject = parsedJson[i];
                                            subjectsData.push(`('${subject.id}', '${subject.subject_name}')`);
                                        }
                                        let queryStr = "INSERT INTO subjects (id, subject_name) VALUES " + subjectsData.join(', ');
                                        pool.query(queryStr, (err, res) => {
                                            if (err) {
                                                throw err;
                                            } else {
                                                console.log('Added "subjects" data successfully');
                                                pool.end();
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}); 