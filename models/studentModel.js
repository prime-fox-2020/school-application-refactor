const pool = require('../config/connection');
const ChangeMonth = require('../helpers/date');

class StudentModel{
    static read(cb){
        pool.query(`SELECT * from students ORDER BY id ASC`, (err, res) => {
            if(err){
                cb(err, null);
            } else {
                let data = res.rows;
                cb(null, data);
            }
        })
    }

    static add_get(cb){
        cb(null ,true)
    }

    static add_post(req, cb){
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let gender = req.body.gender;
        let dateArr = req.body.birth_date.split('-');

        if(dateArr.length > 1){
            dateArr[1] = ChangeMonth.changeToWord(dateArr[1]);
            dateArr[2] = dateArr[2].substring(1);
        }
        let birth_date = dateArr.reverse().join(' ');

        let query = `INSERT into students (first_name, last_name, email, gender, birth_date) 
        VALUES ($1, $2, $3, $4, $5)`;

        let param = [first_name, last_name, email, gender, birth_date];

        pool.query(query, param,(err, res) => {
                if(err){
                    cb(err, null);
                } else {
                    cb(null, true);
                }
            })
    }


    static getEmail(email, cb){
        this.read((err, data) => {
            if(err){
                cb(err, null);
            } else {
                let check = false, result;

                data.forEach(el => {
                    if(email === el.email){
                        result = el;
                        check = true;
                    }
                });

                if(!check){
                    cb(null, 'Wrong Email!');
                } else {
                    cb(null, result);
                }
            }
        })
    }

    static edit_get(id, cb){
        pool.query(`SELECT * from students WHERE id = ${id}`, (err, res) => {
            if(err){
                cb(err, null);
            } else {
                let date = res.rows[0].birth_date.split(' ');
                date[1] = ChangeMonth.changeToNumber(date[1]);
                let birth_date = date.reverse().join('-');
                cb(null, {el :res.rows[0], birth_date});
            }
        })
    }

    static edit_post(id, newStudent, cb){
        let dateArr = newStudent.birth_date.split('-');
        dateArr[1] = ChangeMonth.changeToWord(dateArr[1]);
        let birth_date = dateArr.reverse().join(' ');

        let query = `UPDATE students 
                        SET 
                            first_name = '${newStudent.first_name}',
                            last_name = '${newStudent.last_name}',
                            email = '${newStudent.email}',
                            gender = '${newStudent.gender}',
                            birth_date = '${birth_date}'
                        WHERE 
                            id = ${id}`
    

        pool.query(query, (err, res) => {
            if(err){
                cb(err, null);
            } else {
                cb(null, true);
            }
        })
    }

    static delete(id, cb){
        pool.query(`DELETE from students WHERE id = ${id}`, (err, res) => {
            if(err){
                cb(err, null);
            } else {
                cb(null, true);
            }
        })
    }
}

module.exports = StudentModel;