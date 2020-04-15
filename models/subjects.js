const pool = require('../config/connection');

class Subjects {
  static getData(callback) {
    const query = `
      SELECT * FROM subjects
    `

    pool.query(query, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res.rows);
      }
    })
  }
}

module.exports = Subjects;