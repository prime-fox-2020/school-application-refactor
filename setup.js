const pool = require('./config/connection.js')


const createStudents = `CREATE TABLE "students"(
  "id" serial PRIMARY KEY,
  "first_name" VARCHAR (50) NOT NULL,
  "last_name" VARCHAR (50) NOT NULL,
  "email" VARCHAR (50) NOT NULL,
  "gender" VARCHAR (50),
  insertStudents += `('${students[i].first_name}','${students[i].last_name}','${students[i].email}','${students[i].gender}','${students[i].birth_date}');`
}else{
  insertStudents += `('${students[i].first_name}','${students[i].last_name}','${students[i].email}','${students[i].gender}','${students[i].birth_date}'),\n`
}
}
  "birth_date" VARCHAR(20)
);` ;

const createTeachers = `CREATE TABLE "teachers"(
  "id" serial PRIMARY KEY,
  "first_name" VARCHAR (50) NOT NULL,
  "last_name" VARCHAR (50) NOT NULL,
  "email" VARCHAR (50) NOT NULL,
  "gender" VARCHAR (50)
);` ;

const createSubjects = `CREATE TABLE "subjects"(
  "id" serial PRIMARY KEY,
  "subject_name" VARCHAR (50) NOT NULL
);` ;


pool.query(createStudents, (err, res) => {
  if(err){
  console.log(err)
   }else{
      pool.query(createTeachers, (err, res) => {
          if(err){
              console.log(err)
          }else{
              pool.query(createSubjects, (err, res) => {
                  if(err){
                    console.log(err)
                  }else{
                    console.log("tables created")
                    pool.end()
                  }
              })
          }
      })
   }
})