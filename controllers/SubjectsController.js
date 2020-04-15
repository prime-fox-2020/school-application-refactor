
const SubjectsModel = require(`../models/subjectsModel`)


class SubjectsControllers{
    
    static getTeachersList(req,res){

        SubjectsModel.getSubjects((err,data)=>{
            if(err){
                res.render(`notfound`,{error: err})
            }else{
                res.render(`subjects`,{data})
            }
        })
    }

    static notFound(req,res){
        res.render(`notfound.ejs`,{error: `404 - Page Not Found!`})
    }
}


module.exports = SubjectsControllers