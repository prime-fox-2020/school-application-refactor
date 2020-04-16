const pool = require('../config/connection');

class Teacher {
    constructor(id, first_name, last_name, email, gender) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.gender = gender;
    }

    static list(callback) {
        pool.query('SELECT * FROM teachers', (err, res) => {
            if(err) {
                callback(err, null);
            } else {
                // let parsedJson = JSON.parse(data);
                let result = [];
                res.rows.forEach((teacher) => {
                    result.push(new Teacher(teacher.id, teacher.first_name, teacher.last_name, teacher.email, teacher.gender));
                })
                callback(null, result);
            }
        });
    }
    static getById(id, callback) {
        pool.query('SELECT * FROM teachers WHERE id = $1', [id], (err, res) => {
            if(err) {
                callback(err, null);
            } else {
                // let result = null;
                // for(let i = 0; i < data.length; i++) {
                //     let teacher = data[i];
                //     if(teacher.id === id) {
                //         result = teacher;
                //         break;
                //     }
                // }
                // callback(null, result);
                callback(null, res.rows[0]);
            }
        });
    }
}

module.exports = Teacher