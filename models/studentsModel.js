const pool = require('../connection')

class StudentsModel {
    static getStudents (callback) {
        this.openFile ((err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }

    static studentPost (newStudent, callback) {
        this.writeFile(newStudent,(err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, res)
            }
        })
    }

    static editStudents (data, callback) {
        pool.query(`SELECT first_name, last_name, email FROM students
        WHERE id = ${data}`, (err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, res.rows)
            }
        })
    }

    static postEditStudents (id, firstname, lastname, email, callback) {
        if (firstname.length < 1 || lastname.length < 1 || email.length < 1) {
            callback('Edit data failed, data invalid', null)
        } else {
            for (let i = 0; i < email.length; i++) {
                if (email[i] == '@') {
                    pool.query(`UPDATE students 
                    SET first_name = '${firstname}', last_name = '${lastname}', email = '${email}'
                    WHERE id = ${id}`, (err) => {
                        if (err) {
                            callback(err, null)
                        }
                        else {
                            callback(null, 'Successfully edited')
                        }
                    })
                }
            }
        }
    }

    static getEmail (req, callback) {
        pool.query(`SELECT * FROM students WHERE email = '${req}'`, (err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, res.rows)
            }
        })
    }

    static openFile (callback) {
        pool.query(`SELECT * FROM students`, (err, res) => {
            if (err) {
                callback(err, null)
            }
            else {
                let dob;
                for (let i = 0; i < res.rows.length; i++) {
                    dob = JSON.stringify(res.rows[i].birth_date)
                    dob = dob.split('T')
                    let str = ''
                    for (let j = 1; j < dob[0].length; j++) {
                        str += dob[0][j]
                    }
                    res.rows[i].birth_date = str;
                }
                console.log(res.rows.birth_date)
                callback(null, res.rows)
            }
        })
    }

    static writeFile (data, callback) {
        let dob = data.birth_date.split('-')
        if (dob.length < 3 || data.firstname.length < 1 || data.lastname.length < 1 || data.email.length < 1 || data.gender.length < 1) {
            callback('Data invalid', null)
        } else {
            let flag = false;
            for (let i = 0; i < data.email.length; i++) {
                if (data.email[i] == '@' && data.email.split('.').length >= 2) {
                    flag = true;
                    // console.log(data.birth_date)
                    pool.query(`
                        INSERT INTO students (first_name, last_name, email, gender, birth_date)
                        VALUES ('${data.firstname}', '${data.lastname}', '${data.email}', '${data.gender}', '${data.birth_date}')
                        `, (err) => {
                            if (err) {
                                callback('Email invalid', null)
                            }
                            else {
                                callback(null, 'Sucessfully input data')
                            }
                        }
                    )
                }
            }
            if (!flag) {
                callback('Flag false', null)
            }
        }
    }

    static deleteStudent (id, callback) {
        pool.query(`DELETE FROM students WHERE id = ${id}`, (err) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'Successfully deleted')
            }
        })
    }
}

module.exports = StudentsModel;