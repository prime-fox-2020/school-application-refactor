const pool = require("../config/connection");

class TeachersModel {
  static getTeachers(callback) {
    const query = `
      SELECT * from teachers ORDER BY id asc
    `;

    pool.query(query, (err, res) => {
      if (err) callback(err, null);
      else callback(null, res.rows);
    });
  }

  static getTeachersId(req, callback) {
    pool.query(`SELECT * FROM teachers WHERE id = '${req}'`, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res.rows);
      }
    });
  }
}

module.exports = TeachersModel;
