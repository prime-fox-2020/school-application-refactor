const pool = require('../config/connection');

class Subject {
    constructor(id, subject_name) {
        this.id = id;
        this.subject_name = subject_name;
    }

    static list(callback) {
        pool.query('SELECT * FROM subjects', (err, res) => {
        // fs.readFile(filepath, 'utf-8', (err, data) => {
            if(err) {
                callback(err, null);
            } else {
                // let parsedJson = JSON.parse(data);
                let result = [];
                res.rows.forEach((subject) => {
                    result.push(new Subject(subject.id, subject.subject_name));
                })
                callback(null, result);
            }
        });
    }

    static getById(id, callback) {
        pool.query('SELECT * FROM subjects WHERE id = $1', [id], (err, res) => {
        // this.list((err, data) => {
            if(err) {
                callback(err, null);
            } else {
                // let result = null;
                // for(let i = 0; i < data.length; i++) {
                //     let subject = data[i];
                //     if(subject.id === id) {
                //         result = subject;
                //         break;
                //     }
                // }
                // callback(null, result);
                callback(null,res.rows[0])
            }
        });
    }
}

module.exports = Subject;

