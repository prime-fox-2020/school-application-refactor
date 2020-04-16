const fs = require('fs')

class TeachersModel {
  static open (callback) {
    fs.readFile('./db/teachers.json', 'utf8', (err, data) => {
        if (err) {throw err}
        else {
          callback(null, JSON.parse(data))
        }
    })
  }

  static teachers (callback) {
    this.open ((err, data) => {
      if (err) {callback(err, null)}
      else {callback(null, data)}
    })
  }
}

module.exports = TeachersModel