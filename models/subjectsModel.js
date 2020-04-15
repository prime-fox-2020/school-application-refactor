const pool = require("../config/connection");

class SubjectsModel {
  static getSubjects(callback) {
    const query = `
      SELECT * from subjects ORDER BY id asc
    `;

    pool.query(query, (err, res) => {
      if (err) callback(err, null);
      else callback(null, res.rows);
    });
  }
}

module.exports = SubjectsModel