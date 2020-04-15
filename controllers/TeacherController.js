
const teachersModel = require(`../models/teachersModel`)


class TeachersControllers{
    
    static getTeachersList(req,res){

        teachersModel.getTeachers((err,data)=>{
            if(err){
                res.render(`notfound`,{error: err})
            }else{
                res.render(`teachers`,{data})
            }
        })
    }

    static getTeachersListId(req,res){
        teachersModel.getTeachersId(Number(req.params.id),(err,data)=>{
            if(err){
                render(`notfound`,{error : err})
            }else{
                res.redirect(`/teachers/${Number(req.params.id)}`)
            }
        })
    }


    static notFound(req,res){
        res.render(`notfound.ejs`,{error: `404 - Page Not Found!`})
    }
}


module.exports = TeachersControllers