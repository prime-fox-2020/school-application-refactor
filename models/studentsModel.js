//require postgre
const pool = require("../config/connection");

class studentsModel {
  static getStudents(callback) {
    const query = `
      SELECT * from students ORDER BY id asc
    `;

    pool.query(query, (err, res) => {
      if (err) callback(err, null);
      else callback(null, res.rows);
    });
  }

  static delete(studentsId, callback) {
    const query = `
      DELETE FROM students WHERE id = $1
    `;
    const params = [studentsId];

    pool.query(query, params, err => {
      if (err) callback(err, null);
      else callback(null, `success`);
    });
  }

  static addPost(newStudents, callback) {
    const { first_name, last_name, email, gender, birth_date } = newStudents;
    const query = `
    INSERT INTO students (first_name, last_name, email, gender, birth_date) VALUES ($1, $2, $3, $4, $5)
    `;
    const params = [first_name, last_name, email, gender, birth_date];

    pool.query(query, params, err => {
      if (err) callback(err, null);
      else callback(null, true);
    });
  }

  static editGet(stuId, callback) {
    const query = `SELECT * FROM students WHERE id = $1`;
    const params = [stuId];
    pool.query(query, params, (err, data) => {
      if (err) callback(err, null);
      else callback(null, data.rows[0]);
    });
  }

  static editPost(upStudents, stuId, callback) {
    const query = `
    UPDATE students SET first_name = $1, last_name = $2, email = $3, gender = $4, birth_date = $5 WHERE id = $6
  `;
    const params = [
      upStudents.first_name,
      upStudents.last_name,
      upStudents.email,
      upStudents.gender,
      upStudents.birth_date,
      stuId
    ];

    pool.query(query, params, err => {
      if (err) callback(err, null);
      else callback(null, true);
    });
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
}

module.exports = studentsModel;
