const pool = require('../config/conection');

class Student {
    constructor(first_name, last_name, email, gender, birth_date) {
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.gender = gender
        this.birth_date = birth_date
    }

    getFullName() {
        let fullName = this.first_name + ' ' + this.last_name
        return fullName
    }

    static validate(data, cb) {
        console.log('data: ', data);
        let error = {}
        if (!data.first_name) {
            error.first_name = `First name harus diisi`
        }
        if (!data.last_name) {
            error.last_name = `Last name harus diisi`
        }
        if (!data.email) {
            error.email = `Email harus diisi`
        } else if (!data.email.includes('@')) {
            error.email = `Email harus menggunakan '@`
        }

        if (data.gender == 'null') {
            error.gender = `Gender harus diisi`
        }
        if (!data.birth_date) {
            error.birth_date = `Birth date harus diisi`
        } else {
            let birthDate = data.birth_date.split('-')
            let year = birthDate[0]
            let mount = Number(birthDate[1])
            let day = Number(birthDate[2])
            // console.log(year, mount, day);
            if (year.length != 4) {
                error.birth_date = `Format Year salah`
            }
            else if (mount < 0 || mount > 12) {
                error.birth_date = `Format Mount salah`
            } else if (day < 0 || day > 31) {
                error.birth_date = `Format Date salah`
            }
        }
        console.log('error: ', error);
        cb(error, true)
    }

    static read(cb) {
        pool.query('SELECT * FROM students ORDER BY id asc', (err, res) => {
            if (err) {
                cb(err, null)
            } else {
                cb(null, res.rows)
            }
        })
    }

    static add(el, cb) {
        this.validate(el, (err, data) => {
            if (Object.values(err).length > 0) {
                cb(err, null, null)
            } else {
                pool.query(`INSERT INTO students (first_name, last_name, email, gender, birth_date)
                VALUES ('${el.first_name}', '${el.last_name}', '${el.email}', '${el.gender}', '${el.birth_date}')`, (err, res) => {
                    if (err) {
                        cb(err, null)
                    } else {
                        let newStudent = new Student(el.first_name, el.last_name, el.email, el.gender, el.birth_date)
                        cb(null, `${newStudent.getFullName()} success add`)
                    }
                })
            }
        })
    }

    static delete(id, cb) {
        pool.query(`DELETE FROM students WHERE id = ${Number(id)}`, (err, res) => {
            if (err) {
                cb(err, null, null)
            } else {
                cb(err, `Student with Id : ${id} success deleted`)
            }
        })
    }

    static edit(id, cb) {
        pool.query(`SELECT * FROM students WHERE id = ${Number(id)}`,
        (err, res) => {
            if (err) {
                cb(err, null)
            } else {
                cb(null, res.rows[0])
            }
        })
    }

    static update(req, cb) {
        this.validate(req.body, (err, data) => {
            console.log('err: ', err);
            if (Object.values(err).length > 0) {
                cb(err, req.body, null)
            } else {
                pool.query(`UPDATE students
                SET first_name = '${req.body.first_name}',
                    last_name = '${req.body.last_name}',
                    email = '${req.body.email}',
                    gender = '${req.body.gender}',
                    birth_date = '${req.body.birth_date}'
                WHERE id = ${Number(req.params.id)}`, (err, data) => {
                    if (err) {
                        cb(err, null)
                    } else {
                        cb(null, `Student with Id : ${req.params.id} success updated!`)
                    }
                })
            }
        })

    }

    static emailPost(email, cb) {
        pool.query(`SELECT * FROM students WHERE email = '${email}'`, (err, res) => {
            console.log('email: ', email);
            if (err) {
                cb(err, null)
            } else {
                console.log(res.rows);
                cb(null, res.rows[0], null)
            }
        })
    }
}

module.exports = Student;
