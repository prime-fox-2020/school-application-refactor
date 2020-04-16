const pool = require('../config/connection');

class SubjectsModel {
  //baca file teacher.json -> lempar data ke controller
  static getSubject(callback) {

    const query = `
      SELECT * FROM subjects
    `
    pool.query(query, (err, results) => {
      if(err) callback(err, null);
      else callback(null, results.rows);
    });
  }

  static getSubjectId(subjectID, callback) {

    const query = `
      SELECT * FROM subjects
      WHERE ID = ${subjectID}
    `
    pool.query(query, (err, results) => {
      if(err) callback(err, null);
      else callback(null, results.rows);
    });
  }

}
module.exports = SubjectsModel;
