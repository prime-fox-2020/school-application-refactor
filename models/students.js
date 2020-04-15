const pool = require ('../config/connection')

class Student {
    constructor(id,first_name,last_name,email,gender){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.gender = gender;
    }

    static getTable(cb){
        const select = 'SELECT * FROM "students" ORDER BY "id" ASC'
        pool.query(select, (err,data)=>{
            if(err){
                cb(err,null)
            }else{
                cb(null,data.rows)
            }
        })
    }

    static viewStudents(cb){
        this.getTable((err,data)=>{
            if (err){
                cb(err,null)
            }else{
                cb(null,data)
            }
        })
    }

    static edit (id,cb){
        let selectById =  `SELECT * FROM "students" WHERE id = ${id}`
        pool.query(selectById, (err, data) => {
            if(err){
                cb(err, null)
            } else{
                const editData = data.rows[0]
                cb(null, editData)
            }
        })
    }   

    static change(body, cb){ 
        let changeData = `UPDATE "students" SET first_name = '${body.first_name}', 
        last_name = '${body.last_name}', 
        email = '${body.email}', gender = '${body.gender}' WHERE id = ${body.id}`
        
        pool.query(changeData, (err, data) => {
            if(err){
                cb(err, null)
            } else{
                console.log('changeData in model done')
                cb(null, true)
            }
        })
    }

    static delete(id, cb) {
        let deleteData = `DELETE FROM "students" WHERE "id" = '${id}'`
        pool.query(deleteData, (err, res) => {
          if (err) {
                cb(err, nul)
          } else {
                console.log('berhasil delete')
                cb(null, true)
          }
        })
    }


    static add(body,cb){
        let insertNewData = `INSERT INTO "students"("first_name","last_name","email","gender")
        VALUES\n`
        insertNewData += `('${body.first_name}','${body.last_name}','${body.email}','${body.gender}');`
        pool.query(insertNewData,(err,data)=>{
            if(err){
                cb(err,null)
            }else{
                console.log('insertNewData in model done')
                cb(null,true)
          }
      })

    }

    static selectEmail(email,cb){
        let selectEmail = `SELECT * FROM "students" WHERE "email" = '${email}'`

        pool.query(selectEmail, (err, data) => {
            if(err){
                cb(err, null)
            } else{
                const byEmail = [data.rows[0]]
                cb(null, byEmail)
            }
        })
    }

    static validasi(data) {
        let error = []

        if(!data.first_name) {
            error.push('first name is required')
        }

        if(!data.last_name) {
            error.push('last name is required')
        }

        if(!data.email) {
            error.push('email is required')
        } else if(!data.email.includes('@') || !data.email.includes('.')){
            error.push('wrong format')
        }

        if(!data.gender) {
            error.push('gender is required')
        }

        if(!data.birth_date) {
            error.push('birth day is required')
        } else {
            let splitDate = data.birth_date.split('-')

            for(let i=0; i<splitDate.length; i++){

                let yy = Number(splitDate[0])
                let mm = Number(splitDate[1])
                let dd = Number(splitDate[2])

                if(yy !== 2020) {
                    error.push('YYYY should be 2020')
                } 

                if(mm < 1 || mm > 12) {
                    error.push('MM is only 1-12')
                }

                if(dd <1 ||  dd > 32) {
                    error.push('DD is only 1-31')
                }
            }
        }

        return error
    }

}




module.exports = Student

