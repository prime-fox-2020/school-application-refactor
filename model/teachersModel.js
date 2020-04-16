const pool = require('../config/connection');

class TeachersModel {
  static getTeacher(callback) {

    const query = `
      SELECT * FROM teachers
    `
    pool.query(query, (err, results) => {
      if(err) callback(err, null);
      else callback(null, results.rows);
    });
  }

  static getTeacherId(teacherID, callback) {

    const query = `
      SELECT * FROM teachers
      WHERE ID = ${teacherID}
    `
    pool.query(query, (err, results) => {
      if(err) callback(err, null);
      else callback(null, results.rows);
    });
  }

}
module.exports = TeachersModel;
