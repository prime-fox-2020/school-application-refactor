const pool = require('../config/connection');

class Student {
    constructor(id, first_name, last_name, email, gender, birth_date) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.gender = gender;
        this.birth_date = birth_date;
    }

    static list(callback) {
        pool.query('SELECT * FROM students ORDER BY id', (err, res) => {
        // fs.readFile(filepath, 'utf-8', (err, data) => {
            if(err) {
                callback(err, null);
            } else {
                // let parsedJson = JSON.parse(data);
                let result = [];
                res.rows.forEach((student) => {
                    result.push(new Student(student.id, student.first_name, student.last_name, student.email, student.gender, student.birth_date));
                })
                callback(null, result);
            }
        });
    }

    static getById(id, callback) {
        pool.query('SELECT * FROM students WHERE id = $1 ORDER BY id', [id], (err, res) => {
        // this.list((err, data) => {
            if(err) {
                callback(err, null);
            } else {
                // let result = null;
                // for(let i = 0; i < data.length; i++) {
                //     let student = data[i];
                //     if(student.id === id) {
                //         result = student;
                //         break;
                //     }
                // }
                // callback(null, result);
                callback(null, res.rows[0]);
            }
        });
    }

    static getByEmail(email, callback) {
        pool.query('SELECT * FROM students WHERE email = $1 ORDER BY id', [email], (err, res) => {
        // this.list((err, data) => {
            if(err) {
                callback(err, null);
            } else {
                // let result = null;
                // for(let i = 0; i < data.length; i++) {
                //     let student = data[i];
                //     if(student.email === email) {
                //         result = student;
                //         break;
                //     }
                // }
                // callback(null, result);
                callback(null,res.rows[0])
            }
        });
    }

    static add(first_name, last_name, email, gender, birth_date, callback) {
        pool.query('INSERT INTO students (first_name, last_name, email, gender, birth_date) VALUES ($1, $2, $3, $4, $5)',
        [first_name, last_name, email, gender, birth_date],
       (err, res) => {
        // this.list((err, data) => {
            if(err) {
                // callback(err, null);
                callback(err, false);
            } else {
                // let newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
                // let newStudent = new Student(newId, first_name, last_name, email, gender, birth_date);
                // data.push(newStudent);
                // this.save(data, (err) => {
                //     if(err) {
                        // callback(err, null);
                    // } else {   
                        // callback(null, newStudent);
                    // }
                // });
                callback(null, true);
            }
        });
    }

    static edit(id, first_name, last_name, email, gender, birth_date, callback) {
        // this.list((err, data) => {
            pool.query('UPDATE students SET first_name = $2, last_name = $3, email = $4, gender = $5, birth_date = $6 WHERE id = $1',
            [id, first_name, last_name, email, gender, birth_date],
           (err, res) => {
            if(err) {
                // callback(err);
                callback(err, false)
            } else {
                // for(let i = 0; i < data.length; i++) {
                //     let student = data[i];
                //     if(student.id === id) {
                //         data[i].id = id,
                //         data[i].first_name = first_name,
                //         data[i].last_name = last_name,
                //         data[i].email = email,
                //         data[i].gender = gender,
                //         data[i].birth_date =birth_date
                //         break;
                //     }
                // }
                // this.save(data, callback);
                callback(null, true);

            }
        });
    }

    static delete(id, callback) {
        // this.list((err, data) => {
            pool.query('DELETE FROM students WHERE id = $1', [id], (err, res) => {
            if(err) {
                // callback(err);
                callback(err, false);
            } else {
                // let temp = [];
                // for(let i = 0; i < data.length; i++) {
                //     let student = data[i];
                //     if(student.id !== id) {
                //         temp.push(student);
                //     }
                // }
                // this.save(temp, callback);
                callback(null, true);

            }
        });
    }

    static save(data, callback) {
        fs.writeFile(filepath, JSON.stringify(data, null, 4), callback);
    }
}

module.exports = Student; 