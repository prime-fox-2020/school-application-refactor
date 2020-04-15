const pool = require('../config/connection');

class Teachers {
  static getData(callback) {
    const query = `
      SELECT * FROM teachers
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

module.exports = Teachers;