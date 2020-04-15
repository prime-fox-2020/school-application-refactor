const db=require('../db/config')

class ModelStudent{
    static validate(fname,lname,email,gender,birthdate){
        let error=[]
        if(!fname){
            error.push('First name is required')
        }

        if(!lname){
            error.push('Last name is required')
        }

        if(!email){
            error.push('Email name is required')
        }else {
            if(!email.includes('@')){
                error.push('Format must be right!!!')
            }
        }
        if(!gender){
            error.push('Gender name is required')
        }else if(gender!=='male'&&gender!=='female'){
            error.push('Gender must be male or female')
        }

        if(!birthdate){
            error.push('birthdate name is required')
        }else{
            const res=birthdate.split('-')
            if(res.length!==3){
                error.push('The format is YYYY-MM-DD')
            }else if (res[1]<1||res[1]>12){
                error.push('Month must be 1-12')
            }else if (res[1]==1||res[1]==3||res[1]==5||res[1]==7||res[1]==8||res[1]==10||res[1]==12){
                if(res[2]<1||res[2]>31){
                    error.push('Invalid date')
                }
            }else if (res[1]==4||res[1]==6||res[1]==9||res[1]==11){
                if(res[2]<1||res[2]>30){
                    error.push('Invalid date')
                }
            }else if (res[1]==2){
                if(res[2]<1||res[2]>28){
                    error.push('Invalid date')
                }
            }
        }
        return error
    }
    
    static getData(callback){
        db.query(`SELECT * FROM students ORDER BY id asc`,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,data.rows)
            }
        })
    }

    static filterGet(email,callback){
        const query=`SELECT * FROM students WHERE email = $1`
        const params=[email]
        db.query(query,params,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,data.rows)
            }
        })
    }

    static addPost(fname,lname,email,gender,birthdate,callback){
        const error=this.validate(fname,lname,email,gender,birthdate)
        if(error.length>0){
            callback(error,null)
        }else {
            const query=`INSERT INTO students (first_name,last_name,email,gender,birth_date) VALUES ($1,$2,$3,$4,$5)`
            const params=[fname,lname,email,gender,birthdate]
            db.query(query,params,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                console.log(data)
                callback(null,`New student has added!!!`)
            }
        })
        }  
    }

    static editGet(id,callback){
        const query=`SELECT * FROM students WHERE id = $1`
        const params=[id]
        db.query(query,params,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,data.rows)
            }
        })
    }

    static editPost(id,fname,lname,email,gender,birthdate,callback){
        const error=this.validate(fname,lname,email,gender,birthdate)
        if(error.length>0){
            callback(error,null)
        }else {
        const query=`UPDATE students SET first_name = $2, last_name = $3,
        email = $4, gender = $5, birth_date = $6 WHERE id=$1`
        const params=[id,fname,lname,email,gender,birthdate]
        db.query(query,params,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,`ID ${id} has edited!!!`)
            }
        })
        }
    }

    static deletePost(id,callback){
        const query=`DELETE FROM students WHERE id = $1`
        const params=[id]
        db.query(query,params,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,`Student with id ${id} has been deleted !`)
            }
        })
    }

    static search(email,callback){
        const query=`SELECT * FROM students WHERE email = $1`
        const params=[email]
        db.query(query,params,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,data.rows)
            }
        })
    }
}

module.exports=ModelStudent