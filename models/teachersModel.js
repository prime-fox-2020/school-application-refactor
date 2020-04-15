const fs = require(`fs`)


class TeachersModel{
    constructor(){

    }

    static getTeachers(callback){
        // baca file .json lempar ke controller
        this.open((err,data)=>{
            if(err) callback(err,null)
            else callback(null,data)
        })
    }

    static open(callback){
        fs.readFile(`./teachers.json`,`utf8`,(err,data)=>{
            if(err) callback(err,null)
            else 
            callback(null,JSON.parse(data))

        })
    }

    static getTeachersId(teachersId,callback){

        this.open((err,data)=>{
            if(err){
                callback(err,null)
            }else{
                let teachersListId=[]
                data.forEach(element => {
                    if(teachersId == element.id){
                        teachersListId.push(element)
                    }
                })
                callback(null,teachersListId)

                // this.save(newStudents,(err)=>{
                //     if(err){
                //         callback(err,null)
                //     }else{
                //         callback(null,`Student dengan Id :${studentId} Berhasil di detele`)
                //     }
                // })
            }
        })

    }

}


module.exports = TeachersModel