// const fs = require(`fs`)
const pool = require(`../db/connection`)

class SubjectsModel{
    constructor(id,subjects_name){
        this.id = id,
        this.subjects_name=subjects_name
    }

    static getSubjects(callback){
        // baca file .json lempar ke controller
        // this.open((err,data)=>{
        //     if(err) callback(err,null)
        //     else callback(null,data)
        // })

        let query = `SELECT * FROM subjects ORDER BY id `

        pool.query(query,(err,data)=>{
            if(err){ callback(err,null) }
            else {
                let instance = []

                for (let i = 0; i < data.rows.length; i++) {
                    instance.push( new SubjectsModel(data.rows[i].id,data.rows[i].subjects_name) )
                }

                callback(null,instance)
            }
        })
    }

    // static open(callback){
    //     fs.readFile(`./subjects.json`,`utf8`,(err,data)=>{
    //         if(err) callback(err,null)
    //         else 
    //         callback(null,JSON.parse(data))

    //     })
    // }

}


module.exports = SubjectsModel