const pool = require('../config/connection')

class Students {
    constructor(id, firts_name, last_name, email, gender, birth_date) {
        this.id = id
        this.firts_name = firts_name
        this.last_name = last_name
        this.email = email
        this.gender = gender
        this.birth_date = birth_date
    }

    static show(callback) {
        pool.query(`SELECT * FROM "students" ORDER BY "id"`, (err, result) => {
            if(err) {
                callback(err, null)
            } else {
                let instance = [];
                for(let i = 0; i < result.rows.length; i++) {
                    instance.push(new Students(result.rows[i].id, result.rows[i].firts_name, result.rows[i].last_name, result.rows[i].email, result.rows[i].gender, result.rows[i].birth_date));
                }
                callback(null, instance)
            }
        })
    }

    static add(id, firts_name, last_name, email, gender, birth_date, callback) {
        const error = []
        if(!id) {
            error.push('id is requires')
        }
        if(!firts_name) {
            error.push('first name is requires')
        }
        if(!last_name) {
            error.push('last name is requires')
        }
        if(!email) {
            error.push('email is requires')
        }
        if(!gender) {
            error.push('gender is requires')
        }
        if(!birth_date) {
            error.push('birth date is requires')
        }
        pool.query(`INSERT INTO "students" ("id", "firts_name", "last_name", "email", "gender", "birth_date" ) VALUES ($1, $2, $3, $4)`, [id, firts_name, last_name, email, gender, birth_date], (err, result) => {
            if(err) {
                callback(err, null)
            } else {
                callback(null, true)
            }
        })
    }
}

module.exports = Students