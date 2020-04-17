const fs = require('fs')

class SubjectsModel {
  static open (callback) {
    fs.readFile('./db/subjects.json', 'utf8', (err, data) => {
        if (err) {throw err}
        else {
          callback(null, JSON.parse(data))
        }
    })
  }

  static subjects (callback) {
    this.open ((err, data) => {
      if (err) {callback(err, null)}
      else {callback(null, data)}
    })
  }
}

module.exports = SubjectsModel