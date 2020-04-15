//get data from connection
const pool = require('../config/connection');

class StudentsModel {

  static getStudent(callback) {
    const query = `SELECT * FROM "students"`

    pool.query(query, (err, results) => {
      if(err) callback(err);
      else callback(null, results.rows);
    });
  }

  static getEmail(studentEmail, callback) {
    const query= `SELECT * FROM "students" WHERE email = '${studentEmail}'`

    pool.query(query, (err, results) => {
      if(err) callback(err);
      else callback(null, results.rows);
    });
  }

  static addStudent( firstName, lastName, email, gender, birthdate, callback) {
    const query = `INSERT INTO "students" (firstName, lastName, gender, birthdate)
      VALUES ('${firstName}', '${lastName}', '${email}', '${gender}', '${birthdate}')`

      pool.query(query, (err, results) => {
        if(err) callback(err);
        else callback(null, results.rows);
      });
  }



}

//send data to controller
module.exports = StudentsModel;
