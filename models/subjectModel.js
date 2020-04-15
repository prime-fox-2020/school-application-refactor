const pool = require('../config/connection');

class SubjectModel{
    static read(cb){
        pool.query('SELECT * from subjects', (err, res) => {
            if(err){
                cb(err, null);
            } else {
                let data = res.rows;
                cb(null, data);
            }
        })
    }

    static getId(id, cb){
        this.read((err, data) => {
            if(err){
                cb(err, null);
            } else {
                let check = false, result;

                data.forEach(el => {
                    if(el.id == id){
                        result = el;
                        check = true;
                    }
                });

                if(!check){
                    cb(null, 'Wrong Id!');
                } else {
                    cb(null, result);
                }
            }
        })
    }
}

module.exports = SubjectModel;