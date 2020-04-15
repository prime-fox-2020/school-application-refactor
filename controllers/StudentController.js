
const studentsModel = require(`../models/studentsModel`)


class StudentControllers{
    constructor(){
    }
    
    static getStudentsList(req,res){

        studentsModel.getStudents((err,data)=>{
            if(err){
                res.render(`notfound`,{error: err})
            }else{
                res.render(`students`,{data,alert: req.query})
            }
        })
    }

    static addGet(req,res){
        const error= req.query.error
        res.render(`addStudents.ejs`,{error})
    }

    static addPost(req,res){
        studentsModel.addPost(req.body,(err,data)=>{
            if(err) {
                if(Array.isArray(err)){
                    res.redirect(`/students/add?error=${err.join(`,`)}`)
                }else{
                    res.render(`notfound.ejs`,{error:err})
                }
            }else{
                res.redirect(`/students?message=${data}&type=success`)
            }
        })
    }

    static notFound(req,res){
        res.render(`notfound.ejs`,{error: `404 - Page Not Found!`})
    }

    static delete(req,res){
        studentsModel.delete(Number(req.params.id),(err,data)=>{
            if(err){
                render(`notfound`,{error : err})
            }else{
                res.redirect(`/students?message=${data}&type=success`)
            }
        })
    }

    static editGet(req,res){
        const error = req.query.error
        studentsModel.editGet(Number(req.params.id),(err,data)=>{
            if(err){
                    res.render(`notfound`,{error:err})
            }else{
                res.render(`editStudents`,{data,error})
            }
        })
    }

    static editPost(req,res){

        let studentEdit={
            id:Number(req.params.id),
            first_name: req.body.first_name,
            last_name : req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            birt_date :req.body.birt_date
        }

        studentsModel.editPost(studentEdit,req.params.id,(err,data)=>{
            if(err){
                if(Array.isArray(err)){
                    req.redirect(`/students/${req.params.id}/edit?error=${err.join(`,`)}`)
                }else{
                    res.render(`notfound`,{error:err})
                }
            }else{
                res.redirect(`/students?message=${data}&type=success`)
            }
        })
    }
}


module.exports = StudentControllers