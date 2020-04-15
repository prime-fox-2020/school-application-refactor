const pool = require('../config/connection')

class SubjectModel{
    static get(callback) {
        let query = `
        SELECT * FROM "subjects"
        `
        pool.query(query, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        })
    }

}

module.exports = SubjectModel;